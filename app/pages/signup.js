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
		let me = this.$storage.get("user");
		if (me) Router.push({ name: "home" });

		this.$on("signin", this.siginHandler);
	},
	methods: {
		siginHandler(data) {
			if (data.username) {
				data.password = this.generatePassword();
				data.address = this.$web3.personal.newAccount(data.password);
				this.$web3.eth.defaultAccount = data.address;

				this.tokensRequest(data.address).then(() => {
					console.log(this.$web3.personal.unlockAccount(data.address, data.password));
					console.log(this.$instance.autoclaim(data.username));

					this.$storage.set("user", data);
					this.$eventbus.$emit("reloadContract");
					this.$eventbus.$emit("alert",  {
						type: "success",
						message: `Welcome ${ data.username }!`
					});
				Router.push({ name: "home" });
				}).catch(err => {
					console.error(err);
					this.$eventbus.$emit("alert", {
						type: "danger",
						message: "Error getting founds for this account."
					});
				});
			}
		},
		tokensRequest() {
			return new Promise((resolve, reject) => {
				// Fill ether
				let method = "POST";
				let headers = new Headers();
				let body = JSON.stringify({ address: this.$web3.eth.defaultAccount });
				headers.append("Content-type", "application/json");

				fetch(config.tokensATM, { method, headers, body })
					.then(this.untilEther)
					.then(resolve)
					.catch(reject);
			});
		},
		untilEther() {
			return new Promise((resolve, reject) => {
				// Get balance		
				let interval = setInterval(() => {
					let balance = this.$web3.eth.getBalance(this.$web3.eth.defaultAccount);
					if (balance.toNumber() > 0) {
						clearInterval(interval);
						resolve();
					}
				}, 1000);
			});
		},
		generatePassword() {
			return Math.floor((Math.random() * 99999999) + 10000000) + "";
		}
	},
	components: {
		"signup-form": SignupForm,
		//"fake-spinner": FakeSpinner
	}
})
