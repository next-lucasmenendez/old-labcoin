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
		this.$eventbus.$emit("showSpinner", this.messages);
		this.$eventbus.$emit("initContract");
		this.$eventbus.$on("contractReady", this.updateBalance);
		this.$eventbus.$on("updateBalance", this.updateBalance);
	},
	methods: {
		/** 
			updateBalance talks to contract instance to get current
			user account token balance
		*/
		updateBalance() {
			let registered = this.$instance.isRegistered(this.$web3.eth.defaultAccount);

			let interval = setInterval(() => {
				let tokens = this.$instance.balanceOf(this.$web3.eth.defaultAccount).toNumber();

				let newAndNoFounds = !registered && tokens > 0;
				if (newAndNoFounds || tokens != this.tokens) {
					this.tokens = tokens;
					this.$storage.set("transactionInProgress", false);
					this.$eventbus.$emit("hideSpinner");
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