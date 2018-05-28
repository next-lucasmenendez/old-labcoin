const QRReader = Vue.component("qr-reader", {
	template:	`<div class="sb-inline-block" :style="containerStyles">
					<div :style="videoStyles">
						<video id="preview"></video>
					</div>
				</div>`,
	created() {
        this.$parent.$on("closeCamera", () => {
            Instascan.Camera.getCameras().then(function (cameras) {
                if (cameras.length > 0) {
                    scanner.stop(cameras[0]);
                } else {
                    console.error('No cameras found.');
                }
            }).catch(function (e) {
                console.error(e);
            });        });
	}
	,
	data() {
		return {
			containerStyles: {
				position: "relative",
				width: "80vw",
				height: "80vw",
				overflow: "hidden"
			},
			videoStyles: {
				position: "absolute",
				top: "50%",
				left: "0",
				width: "100%",
				height: "auto",
				transform: "translateY(-50%) scaleX(-1)!important"
			}
		}
	},
	mounted() {
		let scanner = new Instascan.Scanner({
			continuous: true,
			video: document.getElementById('preview'),
			backgroundScan: true,
			scanPeriod: 1,
			mirror: true
		});
		scanner.addListener('scan', function(content) {
            this.$parent.$emit("productScanned", {
                standAddress: "0x6ae9019c13f19ca47eb9f6fb1c85398a2f8d0b06",
                    standName: "Test Stand",
                    productName: "Cardboard",
                    productThumbnail: "https://…"
            });
			console.log(content);
		});
		Instascan.Camera.getCameras().then(function(cameras) {
			if (cameras.length > 0) {
				scanner.start(cameras[1]).catch(console.log);
			} else {
				console.error('No cameras found.');
			}
		}).catch(function(e) {
			console.error(e);
		});
	}
});