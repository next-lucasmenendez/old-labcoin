const QRReader = Vue.component("qr-reader", {
	template:	`<div>
					<div class="sb-inline-block" :style="containerStyles">
						<p class="sb-text-gray" v-if="cameras.length == 0" :style="messageStyle">No camera detected.</p>
						<div :style="videoStyles">
							<video autoplay></video>
						</div>
					</div>
					<div v-if="cameras.lenth > 1" class="sb-margin-2">
						<button type="button" 
								class="sb-button sb-margin-2"
								:class="{ active: camera.id == current }" 
								v-for="camera in cameras"
								@click="changeCamera(camera)">
									{{ camera.name }}
						</button>
					</div>
				</div>`,
	mounted() {
		let video = this.$el.querySelector("video");
		this.qr = new Instascan.Scanner({ video });
		this.qr.addListener("scan", this.codeHandler);

		Instascan.Camera.getCameras()
			.then(cameras => {
				if (cameras.length > 0) {
					let last = cameras[cameras.length - 1];

					this.cameras = cameras;
					this.current = last.id;
					this.qr.stop().then(() => this.qr.start(last));
				}
			})
			.catch(console.error);

        this.$parent.$on("closeCamera", () => this.qr.stop());
	},
	data() {
		return {
			qr: null,
			current: null,
			cameras: [],
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
				transform: "translateY(-50%) scaleX(-1)!important"
			}
		}
	},
	methods: {
		codeHandler(content) {
			this.$parent.$emit("productScanned", content);
		},
		changeCamera(camera) {
			this.current = camera.id;
			this.qr.stop().then(() => this.qr.start(camera));
		}
	}
});