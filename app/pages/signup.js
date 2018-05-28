const SignUp = Vue.component("signup", {
	template: 	`<section class="sb-grid sb-justify-center sb-align-center sb-wrap sb-margin-top-4 sb-margin-bottom-4">
					<div class="sb-col-10 sb-text-center">
						<div class="sb-margin-top-4 sb-margin-bottom-4 sb-padding-top-2 sb-padding-bottom-2">
							<h2 class="sb-h4 sb-text-aqua">Crea tu nickname</h2>
							<hr class="sb-bg sb-margin-top-3 sb-margin-bottom-3">
							<p class="sb-text-white">Crea tu nickname para el evento y recibe <span class="sb-text-aqua">LabCoin</span>'s gratis para conseguir regalos en los diferentes stands.</p>
						</div>
						
						<signup-form></signup-form>
					</div>
				</section>`,
	data() {
		return { config }
	},
	mounted() {
		this.$on("signin", this.siginHandler);
	},
	methods: {
		siginHandler(data) {
			if (data.username) {
				data.password = this.generatePassword();
				data.address = this.$web3.personal.newAccount(data.password)
					
				this.$web3.personal.unlockAccount(data.address, data.password);
				this.$web3.eth.defaultAccount = data.address;

				this.tokensRequest(data.address).catch(err => {
					this.$eventbus.$emit("alert", {
						type: "danger",
						message: "Error getting founds for this account."
					});
				});

				this.$storage.set("user", data);
				this.$eventbus.$emit("alert",  {
					type: "success",
					message: `Welcome ${ data.username }!`
				});
				Router.push({ name: "home" });
			}
		},
		tokensRequest(address) {
			return new Promise((resolve, reject) => {
				let method = "POST";
				let body = JSON.stringify({ address });
				fetch(config.tokensATM, { method, body })
					.then(resolve)
					.catch(reject);
			});
		},
		generatePassword() {
			return Math.floor((Math.random() * 99999999) + 10000000) + "";
		}
	},
	components: {
		"signup-form": SignupForm
	}
})