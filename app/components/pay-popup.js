const PayPopup = Vue.component("pay-popup", {
	template:	`<div class="sb-center-absolute sb-width-80 sb-text-center sb-bg-white sb-padding-3 sb-radius-1 sb-shadow" v-if="transaction">
					
					<p>¿Quieres gastar {{ transaction.productPrice }} {{ transaction.productPrice > 1 ? 'tokens' : 'token' }} en '{{ transaction.productName }}'?</p>
					<img class="db-inline-block sb-width-50" :src="transaction.productThumbnail">

					<hr class="sb-hr sb-hr-light sb-margin-top-4 sb-margin-bottom-4">
					
					<button type="button" class="sb-button sb-button-block" @click="payIt">Comprar</button>
					<button type="button" class="sb-button sb-button-block sb-button-outline" @click="cancel">Cancelar</button>
				</div>`,
	props: {
		transaction: {
			type: Object,
			default() { return false; }
		}
	},
	methods: {
		showSpinner() {
			return new Promise((resolve, reject) => {
				this.$eventbus.$emit("showSpinner");
				setTimeout(resolve, 500);
			});
		},
		unlock() {
			return new Promise((resolve, reject) => {
				let me = this.$storage.get("user");
				let unlocked = this.$web3.personal.unlockAccount(me.address, me.password);
				if (unlocked) resolve();
				else reject();
			});
		},
		locked() {
			this.$eventbus.$emit("hideSpinner");
			this.$storage.remove("user");
			this.$storage.remove("artifact");

			this.$eventbus.$emit("alert", {
				type: "danger",
				message: "User logged out."
			});
			Router.push({ name: "signup" });
		},
		makeTransaction() {
			return new Promise((resolve, reject) => {
				let data = JSON.stringify(this.transaction);
				let cost = parseInt(this.transaction.productPrice);
				let address = this.transaction.standAddress;
				let hash = this.$instance.spendToken(address, cost, data);
				if (hash) resolve(hash);
				else reject();
			});
		},
		emitTransaction(hash) {
			this.transaction.hash = hash;

			let pendingTransactions = this.$storage.get("pendingTransactions") || [];
			pendingTransactions.push(this.transaction);
			this.$storage.set("pendingTransactions", pendingTransactions);

			this.$eventbus.$emit("hideSpinner");
			this.$parent.$emit("payCompleted", this.transaction);
		},
		payIt() {
			let confirmedTransactions = this.$storage.get("confirmedTransactions") || [];
			let found = confirmedTransactions.find(item => item.standAddress == this.transaction.standAddress);
			if (!found) {
				this.showSpinner()
					.then(this.unlock)
					.catch(this.locked)
					.then(this.makeTransaction)
					.then(this.emitTransaction)
					.catch(() => {
						this.$eventbus.$emit("hideSpinner");
						this.$parent.$emit("payCanceled", { message: "Error al enviar la transaction." });
					});
			} else {
				this.$eventbus.$emit("hideSpinner");
				this.$parent.$emit("payCanceled", { message: "Ya has comprado este producto!" });
			}
		},
		cancel() {
			this.$parent.$emit("payCanceled", { message: "Compra cancelada." });
		}
	}
});