const app = new Vue({
	el: "#app",
	template: 	`<section id="labcoin">
					<topbar></topbar>
					<router-view></router-view>
					<alert></alert>
				</section>`,
	router: Router,
	data: { config },
	created() {
		Vue.prototype.$eventbus = new Vue();
		Vue.prototype.$storage = new Storage();
		/** Web3 instance
		let provider = new Web3.providers.HttpProvider(this.config.provider);
		Vue.prototype.web3 = new Web3(provider);
		*/
	},
	components: {
		"topbar": Topbar,
		"alert": Alert
	}
});