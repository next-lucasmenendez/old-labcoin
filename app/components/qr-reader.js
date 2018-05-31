const QRReader = Vue.component("qr-reader", {
	template:	`<div class="sb-inline-block" :style="containerStyles">
					<p class="sb-text-gray" :style="messageStyle">No camera detected.</p>
					<div :style="videoStyles">
						<video autoplay playsinline muted></video>
					</div>
				</div>`,
	mounted() {
		this.video = this.$el.querySelector("video");
		this.webcam = new Webcam(this.video);
		this.decoder = new QCodeDecoder();
		this.startScanning();

		/**
		this.qr = new Instascan.Scanner({ video });
		this.qr.addListener("scan", this.codeHandler);

		Instascan.Camera.getCameras()
			.then(cameras => {
				let iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
				console.log(iOS);

				console.log(cameras);
				if (cameras.length > 0) {
					let initial = iOS ? cameras[0] : cameras[cameras.length - 1];

					this.cameras = cameras;
					this.current = initial.id;
					this.qr.stop().then(() => this.qr.start(initial));
				}
			})
			.catch(console.error);
		*/
        this.$parent.$on("closeCamera", this.stopScanning);
	},
	data() {
		return {
			loop: null,
			video: null,
			webcam: null,
			containerStyles: {
				position: "relative",
				width: "80vw",
				height: "80vw",
				overflow: "hidden"
			},
			messageStyle: {
				position: "absolute",
				top: "50%",
				left: "0",
				width: "100%",
				height: "auto",
				textAlign: "center",
				transform: "translateY(-50%)"
			},
			videoStyles: {
				position: "absolute",
				top: "50%",
				left: "0",
				width: "100%",
				height: "auto",
				textAlign: "center",
				transform: "translateY(-50%)!important"
			}
		}
	},
	methods: {
		startScanning() {
			this.webcam.start().catch(err => {
				console.error(err);
				this.$eventbus.$emit("alert", {
					type: "danger",
					message: "Error starting camera."
				});
			});

			this.loop = setInterval(() => {
				this.decoder.decodeFromImage(this.webcam.shot(), (err, res) => {
					if (!err && res) this.$parent.$emit("productScanned", res);
				});
			}, 500);
		},
		stopScanning() {
			clearInterval(this.loop);
			this.webcam.stop();
		}
	}
});