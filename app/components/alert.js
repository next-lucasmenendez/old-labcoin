let Alert = Vue.component("alert", {
	template:	`<div v-bind:class="[ { show: show }, type ]" v-bind:style="styleObject">
					{{ message }}
				</div>`,
	props: {
		timeout: {
			type: Number,
			default: 3000
		}
	},
	data() {
		return {
			show: false,
			message: "",
			type: "",
			types: [ "success", "warning", "danger" ],
			styleObject: {
				position: "fixed",
				display: "none",
				bottom: "40px",
				left: "30px",
				zIndex: 10000
			}
		}
	},
	created() {
		this.$eventbus.$on("alert", ({ type, message }) => {
			if (this.types.indexOf(type) !== -1) this.alert(type, message);
		});
	},
	methods: {
		alert(type, message) {
			this.type = `alert-${ type }`;
			this.message = message;

			this.in().then(this.out);
		},
		in() {
			return new Promise((resolve) => {
				this.$el.style.display = "block";
				setTimeout(() => {
					this.show = true;
					resolve();
				}, 100);
			});
		},
		out() {
			return new Promise((resolve) => {
				setTimeout(() => {
					this.show = false;

					setTimeout(() => {
						this.$el.style.display = "none";
						resolve();
					}, 300);
				}, this.timeout);
			});
			
		}
	}
});