let FakeSpinner = Vue.component("fake-spinner", {
	template: 	`<div :style="containerStyle" v-if="show">

					<div :style="spinnerStyle">
						<?xml version="1.0" encoding="utf-8"?>
						<svg viewBox="0 0 64 64" width="62" height="64" xmlns="http://www.w3.org/2000/svg">
							<path :fill="turn ? '#FFFFFF' : '#2DCCCD'" d="M 61.556 0.014 C 61.47 0.014 61.388 0 61.302 0 C 35.682 0 22.852 34.403 40.969 54.524 C 46.955 61.172 54.344 64.046 61.556 63.919 L 61.556 0.014 Z" transform="matrix(-1, 0, 0, -1, 94.043765, 63.92302)"/>
							<path :fill="!turn ? '#FFFFFF' : '#2DCCCD'" d="M 29.068 0.014 C 28.982 0.014 28.9 0 28.815 0 C 3.195 0 -9.636 34.403 8.481 54.524 C 14.467 61.172 21.856 64.046 29.068 63.919 L 29.068 0.014 Z" transform="matrix(-1, 0, 0, -1, 29.068011, 63.92302)"/>
						</svg>
					</div>

					<label :style="labelStyle"> Loading... </label>

					<span v-for="message in messages" :style="logStyle" v-if="count > message.second"> {{ message.text }} </span>
				</div>`,
	props: {
		show: {
			type: Boolean,
			required: true
		},
		messages: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			turn: true,
			count: 0,
			interval: null,
			containerStyle: {
				position: "fixed",
				top: 0,
				left: 0,
				width: "100%",
				height: "100%",
				background: "rgba(0,0,0, 0.85)",
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				zIndex: 10
			},
			spinnerStyle: {
				display: "inline-block",
				verticalAlign: "top",
				width: "100%",
				height: "auto",
				textAlign: "center"
			},
			labelStyle: {
				margin: "16px 0",
				color: "white",
				fontSize: "1.4em"
			},
			logStyle: {
				display: "block",
				marginTop: "8px",
				textAlign: "center",
				fontSize: "0.8em",
				fontWeight: 300,
				color: "#bbb"
			}
		}
	},
	watch: {
		show: function(val) {
			if (this.show) {
				this.start();
			} else {
				this.stop();
			}
		}
	},
	methods: {
		start() {
			this.turn = true;
			this.count = 0;
			this.interval = setInterval(() => {
				this.turn = !this.turn;
				this.count++;
			}, 1000);
		},
		stop() {
			clearInterval(this.interval);
		}
	}
})