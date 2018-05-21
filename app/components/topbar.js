let Topbar = Vue.component("topbar", {
	template:	`<nav class="sb-width-100 sb-bg-black sb-text-white">
					<div class="sb-grid sb-justify-between sb-align-center">
						<div class="sb-col-auto sb-padding-2">
							<img class="logo-event" v-bind:src="logoevent">
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