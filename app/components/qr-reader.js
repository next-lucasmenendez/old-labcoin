const QRReader = Vue.component("qr-reader", {
	template:	`<div class="sb-inline-block" :style="containerStyles">
					<div :style="videoStyles">
						<video id="preview"></video>
					</div>
				</div>`,
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