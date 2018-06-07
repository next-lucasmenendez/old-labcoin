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
			requiredFields: { 
				sa: "standAddress", 
				sn: "standName", 
				pn: "productName", 
				pp: "productPrice", 
				pt: "productThumbnail"
			},
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
		validateTransaction(rawTransaction) {
			return new Promise((resolve, reject) => {
				let newTransaction;
				try {
					newTransaction = JSON.parse(rawTransaction);
				} catch (e) { 
					reject(e);
				}

				let required = Object.keys(this.requiredFields);
				let found = Object.keys(newTransaction).filter(field => required.indexOf(field) != -1);
				if (found.length == required.length) {
					let transaction = {}
					Object.keys(newTransaction).forEach(rawKey => {
						let key = this.requiredFields[rawKey];
						transaction[key] = newTransaction[rawKey];
					});
					resolve(transaction);
				} else {
					reject(`Bad formated product: Required ${ required }, got ${ found }`);
				}
			});
		},
		transactionHandler(rawTransaction) {
			this.validateTransaction(rawTransaction)
				.then(transaction => {
					transaction.standAddress = `${ this.config.addressPrefix }${ transaction.standAddress }`;

					let confirmedTransactions = this.$storage.get("confirmedTransactions") || [];
					if (confirmedTransactions.indexOf(transaction.standAddress) == -1) {
						this.transaction = transaction;
					} else {
						this.$eventbus.$emit("alert", {
							type: "warning",
							message: "Ya has comprado este producto!"
						});
					}
				})
				.catch(console.error);
		},
		payHandler(data, success) {
			let type = "warning";
			let message = success ? `Genial! Transacción enviada.` : data.message; 

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