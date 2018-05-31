class Webcam {
	constructor(elem, front) {
		if (!this.check()) throw "Media devices not avalible.";
		this.stream = {};
		this.facingMode = (typeof front === "boolean" && front) ? "user" : "environment";

		try {
			if (elem instanceof HTMLElement) {
				this.video = elem;
			} else {
				throw "Error with element provided.";
			}
		} catch(e) {
			if (typeof elem === "object" && elem !== null && elem.nodeType === 1 && typeof elem.nodeName === "string") {
				this.video = elem;
			} else {
				throw "Error with element provided.";
			}
		};
	}

	check() {	
		return navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
	}

	start() {
		let config = {
			audio: false,
			video: { facingMode: this.facingMode }
		}

		return new Promise((resolve, reject) => {
			navigator.mediaDevices.getUserMedia(config)
				.then(stream => {
					this.stream = stream;
					if ("srcObject" in this.video) this.video.srcObject = stream;
					else this.video.src = window.URL.createObjectURL(stream);

					this.video.onloadedmetadata = (e) => this.video.play().catch(reject);
					resolve();
				})
				.catch(reject);	
		});
	}

	shot() {
		let canvas = document.createElement("canvas");
		canvas.width = this.video.videoWidth;
		canvas.height = this.video.videoHeight;
		canvas.getContext('2d').drawImage(this.video, 0, 0, canvas.width, canvas.height);
		return canvas.toDataURL();
	}

	stop() {
		return new Promise((resolve, reject) => {
			try {
				this.stream.getTracks().forEach(elem => elem.stop());
			} catch(err) {
				reject(err);
			}
			
			this.video.src = "";
			this.video.srcObject = null;
			resolve();
		});
	}
}