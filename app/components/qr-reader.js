const QRReader = Vue.component("qr-reader", {
	template:	`<div class="sb-inline-block" :style="containerStyles">
					<p class="sb-text-gray" :style="messageStyle">No camera detected.</p>
					<video :style="videoStyles" autoplay playsinline muted></video>
				</div>`,
	mounted() {
		this.video = this.$el.querySelector("video");
		this.webcam = new Webcam(this.video);
		this.decoder = new QCodeDecoder();
		this.startScanning();

        this.$parent.$on("closeCamera", this.stopScanning);
        this.$parent.$on("startCamera", this.startScanning);
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
				try {
					this.decoder.decodeFromImage(this.webcam.shot(), (err, res) => {
						if (!err && res) this.$parent.$emit("productScanned", res);
					});
				} catch {}
			}, 500);
		},
		stopScanning() {
			clearInterval(this.loop);
			this.webcam.stop().catch(console.err);
		}
	}
});