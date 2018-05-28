const Home = Vue.component("home", {
	template: 	`<section class="sb-padding-top-4 sb-padding-4 sb-text-center">
					<tokens-counter :count="tokens" :label="message"></tokens-counter>

					<hr class="sb-hr sb-margin-top-3 sb-margin-bottom-3">

					<tilling :count="tokens"></tilling>

					<router-link tag="button" class="sb-button sb-button-large sb-width-70 sb-margin-top-4 sb-margin-bottom-2" :to="{ name: 'scan' }">
						Escanear QR
					</router-link>

					<small class="sb-inline-block sb-margin-top-2 sb-margin-bottom-2 sb-text-light">
						Escanea el QR de cualquier producto para comprarlo!
					</small>

					<fake-spinner :show="showSpinner" :messages="messages"></fake-spinner>
				</section>`,
	data() {
		return {
			tokens: 0,
			message: "Tokens disponibles",
			showSpinner: true,
			messages: [
				{ second: 1, text: "Connecting" },
				{ second: 3, text: "Making money" }
			]
		}
	},
	mounted() {
		this.updateBalance(true);
		this.$eventbus.$on("updateBalance", () => this.updateBalance(false));
	},
	methods: {
		/** 
			updateBalance talks to contract instance to get current
			user account token balance
		*/
		updateBalance(newUser) {
			let interval = setInterval(() => {
				let tokens = this.$instance.balanceOf(this.$web3.eth.defaultAccount).toNumber();

				if ((newUser && tokens != this.tokens) || !newUser) {
					this.tokens = tokens;
					this.showSpinner = false;
					clearInterval(interval);
				} 
			}, 1000);
			
		}
	},
	components: {
		"tokens-counter": TokensCounter,
		"fake-spinner": FakeSpinner
	}
});