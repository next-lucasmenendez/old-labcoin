const Home = Vue.component("home", {
	template: 	`<section class="sb-padding-top-4 sb-padding-4 sb-text-center">
					<tokens-counter :count="tokens" :label="message" :color="color"></tokens-counter>

					<small v-if="pendings" class="sb-text-center sb-text-yellow">
						Transacción pendiente de confirmar
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
			pendings: false
		}
	},
	created() {
		this.$eventbus.$emit("initContract");
		this.$eventbus.$on("contractReady", this.loop);
	},
	mounted() {
		this.pendings = this.$storage.get("pendingTransactions");
	},
	watch: {
		tokens(newVal) {
			this.color = (newVal > 0) ? ((this.pendings > 0) ? 'sb-counter-yellow' : 'sb-counter-aqua') : 'sb-counter-red';
		},
		pendings(newVal) {
			this.color = (newVal > 0) ? 'sb-counter-yellow' : ((this.tokens > 0) ? 'sb-counter-aqua' : 'sb-counter-red');
		}
	},
	methods: {
		loop() {
			setInterval(this.update, 1000);
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
					this.$storage.set("pendingTransactions", false);
				}
			} catch(e) { console.error(e); }
		}
	},
	components: {
		"tokens-counter": TokensCounter
	}
});