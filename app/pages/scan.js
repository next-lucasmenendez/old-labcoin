const Scan = Vue.component("scan", {
	template: 	`<section id="scan">
					<qr-reader></qr-reader>
				</section>`,
	components: {
		"qr-reader": QRReader
	}
});