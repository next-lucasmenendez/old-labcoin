const SignUp = Vue.component("signup", {
	template: 	`<section class="sb-grid sb-justify-center sb-align-center sb-wrap sb-margin-top-4 sb-margin-bottom-4">
					<div class="sb-col-10 sb-text-center">
						<div class="sb-margin-top-4 sb-margin-bottom-4 sb-padding-top-2 sb-padding-bottom-2">
							<h2 class="sb-h4 sb-text-aqua sb-margin-bottom-3">Crea tu nickname</h2>
							<p class="sb-text-white sb-margin-top-3">Crea tu nickname para el evento y recibe <span class="sb-text-aqua">LabCoin</span>'s gratis para conseguir regalos en los diferentes stands.</p>
						</div>

						<signup-form></signup-form>
					</div>
				</section>`,
	data() {
		return { 
			config,
			spinner: false
		}
	},
	mounted() {
		/** Check if user is currently logged */
		let me = this.$storage.get("user");
		if (me) Router.push({ name: "waiting" });

		this.$on("signin", this.siginHandler);
	},
	methods: {
		showSpinner() {
			return new Promise((resolve, reject) => {
				this.$eventbus.$emit("showSpinner");
				setTimeout(resolve, 200);
			});
		},
		/** 
			signinHandler generates user profile with alias received.
			Then call to tokenRequest to get ether and then talk with
			the contract to get tokens.
		*/
		siginHandler(data) {
			if (data.username) {
				this.showSpinner().then(() => {
					data.password = this.generatePassword();
					data.address = this.$web3.personal.newAccount(data.password);
					this.$web3.eth.defaultAccount = data.address;

					this.$storage.set("user", data);

					this.tokensRequest(data.address)
						.then(() => {
							this.$eventbus.$emit("hideSpinner");
							Router.push({ name: "waiting" });
						})
						.catch(err => {
							console.error(err);
							this.$eventbus.$emit("hideSpinner");
							this.$eventbus.$emit("alert", {
								type: "danger",
								message: "Error creating account for this user."
							});
						});
				});
			}
		},
		/**
			tokenRequest make http calls to config.tokensATM to initialize
			the process to get ether to the current user address, then wait
			for the end of untilEther function.
		*/
		tokensRequest() {
			return new Promise((resolve, reject) => {
				// Fill ether
				let method = "POST";
				let headers = new Headers();
				let body = JSON.stringify({ address: this.$web3.eth.defaultAccount });
				headers.append("Content-type", "application/json");

				fetch(config.tokensATM, { method, headers, body })
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
