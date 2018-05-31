const app = new Vue({
	el: "#app",
	template: 	`<section id="labcoin">
					<topbar></topbar>

					<section class="sb-relative">					
						<toast-alert></toast-alert>
					
						<transition name="fade">
							<router-view></router-view>
						</transition>
					
						<fake-spinner :show="showSpinner" :messages="messagesSpinner"></fake-spinner>
					</section>
				</section>`,
	router: Router,
	data: { 
		config,
		showSpinner: false,
		messagesSpinner: []
	},
	created() {
		/** Init EventBus and Storage wrappers */
		Vue.prototype.$eventbus = new Vue();
		Vue.prototype.$storage = new Storage();

		/** Web3 instance */
		let provider = new Web3.providers.HttpProvider(this.config.provider);
		Vue.prototype.$web3 = new Web3(provider);
		Vue.prototype.$contract = null;
		Vue.prototype.$instance = null;

		this.initContract();

		/** Check if user is currently logged, and init contract */
		let me = this.$storage.get("user");
		if (me) {
			this.$web3.eth.defaultAccount = me.address;
			this.$web3.personal.unlockAccount(me.address, me.password);
		}
	},
	mounted() {
		this.$eventbus.$on("initContract", this.initContract);
		this.$eventbus.$on("showSpinner", messages => {
			this.messagesSpinner = messages;
			this.showSpinner = true;
		});

		this.$eventbus.$on("hideSpinner", () => {
			this.messagesSpinner = [];
			this.showSpinner = false;
		})
	},
	methods: {
		/** initContract initialize contract instance */
		initContract() {
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
		},
		/** Get cached artifact or get it from config.contractUri */
		getArtifact() {
			return new Promise((resolve, reject) => {
				let artifact = this.$storage.get("artifact");
				if (artifact) {
					resolve(artifact);
				} else {
					console.log(artifact, "hola d");

					fetch(this.config.contractUri)
						.then(res => res.json())
						.then(json => {
							this.$storage.set("artifact", json);
							resolve(json);
						})
						.catch(reject);
				}
			});
		},
		/** Instance contract with artifact */
		instanceContract(artifact) {
			if (this.$contract == null || this.$instance == null) {
				let contract = this.$web3.eth.contract(artifact.abi);
				Vue.prototype.$contract = contract;
				Vue.prototype.$instance = contract.at(artifact.networks["1337"].address);
			}
			this.$eventbus.$emit("contractReady");
		}
	},
	components: {
		"topbar": Topbar,
		"toast-alert": ToastAlert,
		"fake-spinner": FakeSpinner
	}
});