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
		unlock() {
			return new Promise((resolve, reject) => {
				let me = this.$storage.get("user");
				let unlocked = this.$web3.personal.unlockAccount(me.address, me.password);
				if (!unlocked) reject(); else resolve();
			});
		},
		payIt() {
			this.unlock()
				.then(() => {
					let data = JSON.stringify(this.transaction);
					let hash = this.$instance.spendToken(this.transaction.standAddress, parseInt(this.transaction.productPrice), data);

					if (hash) {
						let pendingTransactions = this.$storage.get("pendingTransactions") || [];
						pendingTransactions.push(hash);
						this.$storage.set("pendingTransactions", pendingTransactions);

						this.$parent.$emit("payCompleted", this.transaction);	
					} else {
						this.$parent.$emit("payCanceled", { message: "Error perfoming transaction." });	
					}
				})
				.catch(() => {
					this.$storage.remove("user");
					this.$storage.remove("artifact");

					this.$eventbus.$emit("alert", {
						type: "danger",
						message: "User logged out."
					});
					Router.push({ name: "signup" })
				});
		},
		cancel() {
			this.$parent.$emit("payCanceled", { message: "Compra cancelada." });
		}
	}
});