const app = new Vue({
	el: "#app",
	template: 	`<section id="labcoin">
					<topbar></topbar>
					<transition name="slideInUp">
						<router-view ></router-view>
					</transition>
					<alert></alert>
				</section>`,
	router: Router,
	data: { 
		config,
		contract: null,
		instance: null
	},
	created() {
		Vue.prototype.$eventbus = new Vue();
		Vue.prototype.$storage = new Storage();

		/** Web3 instance */
		let provider = new Web3.providers.HttpProvider(this.config.provider);
		Vue.prototype.$web3 = new Web3(provider);

		/** Contract instance */
		if (this.$web3.isConnected()) {
			this.getContract()
				.then(contract => {
					this.contract = TruffleContract(contract);
					this.contract.setProvider(this.$web3.currentProvider);
				})
				.then(() => this.$eventbus.$emit("contractReady"))
				.catch(err => {
					console.error(err);
					this.$eventbus.$emit({
						type: "danger",
						message: "Error getting contract instance ;("
					});
				});
		}

		this.$eventbus.$on("getContractInstance", this.getContractInstance);
	},
	methods: {
		getContract() {
			return new Promise((resolve, reject) => {
				let headers = new Headers();
				headers.append("Accept", "application/vnd.github.v3.raw");

				fetch(this.config.contractUri, { headers })
					.then(res => res.json())
					.then(resolve)
					.catch(reject)
			});
		},
		getContractInstance() {
				this.contract.deployed().then(instance => {
					this.instance = instance;
					this.$eventbus.$emit("contractInstance", instance)
				})
				.catch(err => {
					console.error(err);
					this.$eventbus.$emit("alert", {
						type: "danger",
						message: "Error getting contract instance"
					});
				})
			
		}
	},
	components: {
		"topbar": Topbar,
		"alert": Alert
	}
});