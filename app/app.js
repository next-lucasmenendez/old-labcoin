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

		let me = this.$storage.get("user");
		if (me) {
			this.$web3.eth.defaultAccount = me.address;
			this.$web3.personal.unlockAccount(me.address, me.password);
		}
	},
	methods: {
		getArtifact() {
			return new Promise((resolve, reject) => {
				fetch(this.config.contractUri)
					.then(res => res.json())
					.then(resolve)
					.catch(reject)
			});
		},
		instanceContract(artifact) {
			if (this.$contract == null || this.$instance == null) {
				let contract = this.$web3.eth.contract(artifact.abi);
				Vue.prototype.$contract = contract;
				Vue.prototype.$instance = contract.at(this.config.contractAddress);
			}
			this.$eventbus.$emit("contractReady");
		}
	},
	components: {
		"topbar": Topbar,
		"alert": Alert
	}
});