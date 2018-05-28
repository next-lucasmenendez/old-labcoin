const Scan = Vue.component("scan", {
	template: 	`<section class="sb-padding-top-4 sb-padding-4 sb-text-center">
					<qr-reader></qr-reader>
					<p class="sb-margin-top-2 sb-margin-bottom-2 sb-text-white">
						Elije tu producto en cualquier stand y escanea su QR para comprarlo!
					</p>
					<pay-popup :transaction="transaction"></pay-popup>
				</section>`,
	data() {
		return {
			requiredFields: [ "standAddress", "standName", "productName", "productPrice", "productThumbnail" ],
			transaction: null /*{
				standAddress: "0x6ae9019c13f19ca47eb9f6fb1c85398a2f8d0b06",
				standName: "Test Stand",
				productName: "Cardboard",
				productThumbnail: "https://d30y9cdsu7xlg0.cloudfront.net/png/1499192-200.png"
			}*/
		}
	},
	created() {
		this.$on("productScanned", this.transactionHandler);
		this.$on("payCompleted", () => this.payHandler(true));
		this.$on("payCanceled", () => this.payHandler(false));
	},
	methods: {
		transactionHandler(rawTransaction) {
			let transaction;
			try {
				transaction = JSON.parse(rawTransaction);
			} catch(err) {
				console.error(err);
				this.$eventbus.$emit("alert", {
					type: "danger",
					message: "Bad formated product."
				});
			}

			let keys = Object.keys(transaction).filter(field => this.requiredFields.indexOf(field));
			if (keys.length() == this.requiredFields.length()) {
				this.transaction = transaction;
			} else {
				console.error(`Bad formated product: Required ${ this.requiredFields }, got ${ keys }`);
				this.$eventbus.$emit("alert", {
					type: "danger",
					message: "Bad formated product."
				});	
			}
		},
		payHandler(success) {
			let type = success ? "success" : "warning";
			let message = success ? `Genial! Acabas de comprar: ${ this.transaction.productName}` : "Compra cancelada."; 

			this.$eventbus.$emit("alert", { type, message });
			this.transaction = null;
			Router.push({ name: "home" });
		}
	},
	components: {
		"qr-reader": QRReader,
		"pay-popup": PayPopup
	}
});