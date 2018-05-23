const app = new Vue({
	el: "#app",
	template: 	`<section id="labcoin">
					<topbar></topbar>
					<router-view></router-view>
					<alert></alert>
				</section>`,
	router: Router,
	data: { 
		config,
		contract: null
	},
	created() {
		Vue.prototype.$eventbus = new Vue();
		Vue.prototype.$storage = new Storage();
		/** Web3 instance */
		let provider = new Web3.providers.HttpProvider(this.config.provider);
		Vue.prototype.$web3 = new Web3(provider);
		Vue.prototype.MyContract = null;
		
		if (this.$web3.isConnected()) {
			this.getContract()
				.then(contract => {
					Vue.prototype.MyContract = contract;
				})
				.catch(console.error)
		}

		//var EventTicketArtifact = data;
      	//App.contracts.EventTicket = TruffleContract(EventTicketArtifact); //Change to Web3
	},

	methods: {
		getContract() {
			return new Promise((resolve, reject) => {
				let headers = new Headers();
				headers.append("Accept", "application/vnd.github.v3.raw");

				fetch(this.config.contractUri, { headers })
					.then(res => res.json())
					.then(json => {
						resolve(new this.$web3.eth.contract(json))
					})
					.catch(reject)
			});
		}
	},
	components: {
		"topbar": Topbar,
		"alert": Alert
	}
});