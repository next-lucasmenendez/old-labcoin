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
			config,
			requiredFields: [ "standAddress", "standName", "productName", "productPrice", "productThumbnail" ],
			transaction: null
		}
	},
	created() {
		this.$on("productScanned", this.transactionHandler);
		this.$on("payCompleted", transaction => this.payHandler(transaction, true));
		this.$on("payCanceled", err => this.payHandler(err, false));
	},
	beforeRouteLeave(to, from, next) {
		this.$emit("closeCamera");
		next();
	},
	methods: {
		transactionHandler(rawTransaction) {
			if (rawTransaction) {
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

				let keys = Object.keys(transaction).filter(field => this.requiredFields.indexOf(field) != -1);
				if (keys.length == this.requiredFields.length) {
					transaction.standAddress = `${ this.config.addressPrefix }${ transaction.standAddress }`;
					this.transaction = transaction;
				} else {
					console.error(`Bad formated product: Required ${ this.requiredFields }, got ${ keys }`);
					this.$eventbus.$emit("alert", {
						type: "danger",
						message: "Bad formated product."
					});	
				}
			}
		},
		payHandler(data, success) {
			let type = success ? "success" : "warning";
			let message = success ? `Genial! Acabas de comprar: '${ this.transaction.productName }'` : data.message; 

			this.$eventbus.$emit("alert", { type, message });
			this.transaction = null;
			
			if (success) Router.push({ name: "home" });
		}
	},
	components: {
		"qr-reader": QRReader,
		"pay-popup": PayPopup
	}
});