const app = new Vue({
	el: "#app",
	template: 	`<section id="labcoin">
					<topbar></topbar>
					<transition name="fade">
						<router-view></router-view>
					</transition>
					<alert></alert>
				</section>`,
	router: Router,
	data: { config },
	created() {
		Vue.prototype.$eventbus = new Vue();
		Vue.prototype.$storage = new Storage();

		/** Web3 instance */
		let provider = new Web3.providers.HttpProvider(this.config.provider);
		Vue.prototype.$web3 = new Web3(provider);
		Vue.prototype.$contract = null;
		Vue.prototype.$instance = null;

		/** Contract instance */
		if (this.$web3.isConnected()) {
			this.getArtifact()
				.then(this.instanceContract)
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
		getArtifact() {
			return new Promise((resolve, reject) => {
				//let headers = new Headers();
				//headers.append("Accept", "application/vnd.github.v3.raw");

				fetch(this.config.contractUri)
					.then(res => res.json())
					.then(resolve)
					.catch(reject)
			});
		},
		instanceContract(artifact) {
			let contract = this.$web3.eth.contract(artifact.abi);
			Vue.prototype.$contract = contract;
			Vue.prototype.$instance = contract.at(this.config.contractAddress);
			this.$eventbus.$emit("contractReady");
		},
		/*getContractInstance() {
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
			});
		}*/
	},
	components: {
		"topbar": Topbar,
		"alert": Alert
	}
});