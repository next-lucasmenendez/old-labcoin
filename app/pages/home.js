const Home = Vue.component("home", {
	template: 	`<section class="sb-padding-top-4 sb-padding-4 sb-text-center">
					<tokens-counter :count="tokens" :label="message"></tokens-counter>

					<hr class="sb-hr sb-margin-top-3 sb-margin-bottom-3">

					<tilling :count="tokens"></tilling>

					<router-link tag="button" class="sb-button sb-width-70 sb-margin-top-4 sb-margin-bottom-2" :to="{ name: 'scan' }">
						Escanear QR
					</router-link>

					<small class="sb-inline-block sb-margin-top-2 sb-margin-bottom-2 sb-text-aqua">
						Escanea el QR de cualquier producto para comprarlo!
					</small>
				</section>`,
	data() {
		return {
			tokens: 0,
			message: "Tokens disponibles"
		}
	},
	mounted() {
		this.$eventbus.$on("contractReady", this.updateBalance);
	},
	methods: {
		updateBalance() {
			let me = this.$storage.get("user")
			this.tokens = this.$instance.balanceOf(me.address).toNumber();
		}
	},
	components: {
		"tokens-counter": TokensCounter
	}
});