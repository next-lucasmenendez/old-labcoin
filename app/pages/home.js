const Home = Vue.component("home", {
	template: 	`<section class="sb-padding-top-4 sb-padding-4 sb-text-center">
					<tokens-counter :count="tokens" :label="message" :color="this.tokens > 0 ? 'sb-counter-aqua' : 'sb-counter-red'"></tokens-counter>

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
			messages: [
				{ second: 1, text: "Connecting" },
				{ second: 2, text: "Making money" }
			]
		}
	},
	created() {
		this.$eventbus.$emit("initContract");
		this.$eventbus.$on("contractReady", this.updateBalance);
	},
	methods: {
		/** 
			updateBalance talks to contract instance to get current
			user account token balance
		*/
		updateBalance() {
			this.tokens = this.$instance.balanceOf(this.$web3.eth.defaultAccount).toNumber();
			let interval = setInterval(() => {
				try {
					let tokens = this.$instance.balanceOf(this.$web3.eth.defaultAccount).toNumber();
					if (tokens != this.tokens) this.tokens = tokens;
				} catch(e) { console.error(e); }
			}, 3000);
			
		}
	},
	components: {
		"tokens-counter": TokensCounter
	}
});