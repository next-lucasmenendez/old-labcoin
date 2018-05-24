const Home = Vue.component("home", {
	template: 	`<section id="home">
					<div class="sb-padding-top-4 sb-padding-4 sb-text-center">
						<tokens-counter :count="count" :label="message"></tokens-counter>

						<hr class="sb-bg-gray sb-margin-top-3 sb-margin-bottom-3">

						<tilling :count="count"></tilling>

						<router-link tag="button" class="sb-button sb-width-70 sb-margin-top-4 sb-margin-bottom-2" :to="{ name: 'scan' }">
							Escanear QR
						</router-link>

						<small class="sb-inline-block sb-margin-top-2 sb-margin-bottom-2 sb-text-aqua">
							Escanea el QR de cualquier producto para comprarlo!
						</small>
					</div>
				</section>`,
	data() {
		return {
			count: 9,
			message: "Tokens disponibles"
		}
	},
	mounted() {
		this.$eventbus.$on("contractReady", () => this.$eventbus.$emit("getContractInstance"));
		this.$eventbus.$on("contractInstance", this.loadBalance);
	},
	methods: {
		loadBalance(contractInstance) {
			let me = this.$storage.get("user")
			console.log(contractInstance.balanceOf(me.address));
		}
	},
	components: {
		"tokens-counter": TokensCounter
	}
});