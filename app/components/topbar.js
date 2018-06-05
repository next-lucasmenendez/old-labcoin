let Topbar = Vue.component("topbar", {
	template:	`<nav class="sb-width-100 sb-bg-black sb-text-white sb-fixed-top">
					<div class="sb-grid sb-justify-between sb-align-center">
						<div class="sb-col-auto sb-padding-2">
							<router-link :to="{ name: 'home' }"><img class="logo-event" v-bind:src="logoevent"></router-link>
						</div>
						<div class="sb-col-auto sb-padding-2">
							<img class="logo-coin" v-bind:src="logocoin">
						</div>
					</div>
				</nav>`,
	data() {
		return {
			logoevent: "assets/img/logo-event.svg",
			logocoin: "assets/img/logo-coin.svg",
		}
	}
})