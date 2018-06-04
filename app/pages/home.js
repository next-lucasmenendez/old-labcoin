const Home = Vue.component("home", {
	template: 	`<section class="sb-padding-top-4 sb-padding-4 sb-text-center">
					<tokens-counter :count="tokens" :label="message" :color="color"></tokens-counter>

					<small v-if="pendings.length" class="sb-text-center sb-text-yellow">
						{{ pendings.length > 1 ? 'Transacciones pendientes de confirmar' : 'Transacción pendiente de confirmar' }}
					</small>

					<hr class="sb-hr sb-margin-top-3 sb-margin-bottom-3">

					<tilling :count="tokens"></tilling>

					<router-link tag="button" class="sb-button sb-button-large sb-width-70 sb-margin-top-4 sb-margin-bottom-2" :to="{ name: 'scan' }">
						Escanear QR
					</router-link>

					<small class="sb-inline-block sb-margin-top-2 sb-margin-bottom-2 sb-text-light">
						Escanea el QR de cualquier producto para comprarlo!
					</small>
				</section>`,
	data() {
		return {
			tokens: 0,
			message: "Tokens disponibles",
			color: "sb-counter-aqua",
			pendings: this.$storage.get("pendingTransactions") || []
		}
	},
	created() {
		this.$eventbus.$emit("initContract");
		this.$eventbus.$on("contractReady", this.loop);
	},
	watch: {
		tokens(newTokens) {
			this.color = (newTokens > 0) ? ((this.pendings > 0) ? 'sb-counter-yellow' : 'sb-counter-aqua') : 'sb-counter-red';
		},
		pendings(newPendings) {
			if (newPendings > 0) {
				this.color = "sb-counter-yellow";
			} else {
				this.color = this.tokens > 0 ? "sb-counter-aqua" : "sb-counter-red";
			}
		}
	},
	methods: {
		loop() {
			this.update();

			setInterval(() => {
				this.update();
			}, 10000);
		},
		/** 
			update talks to contract instance to get current
			user account token balance
		*/
		update() {
			try {
				let tokens = this.$instance.balanceOf(this.$web3.eth.defaultAccount).toNumber();
				if (tokens != this.tokens) {
					this.tokens = tokens;
					this.checkPendings();
				}
			} catch(e) { console.error(e); }
		},
		checkPendings() {
			this.pendings = this.$storage.get("pendingTransactions");
					
			if (this.pendings.length) {
				this.pendings.forEach((pending, index) => {
					this.$web3.eth.getTransactionReceipt(pending, (err, data) => {
						if (!err && data.blockNumber) {
							this.pendings.splice(index, 1);
							this.$storage.set("pendingTransactions", this.pendings);

							let purchases = this.$storage.get("purchases");
							purchases.push(pending);
							this.$storage.set("purchases", purchases);
						}
						return
					});
				});
			}
		}
	},
	components: {
		"tokens-counter": TokensCounter
	}
});