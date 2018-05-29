let ToastAlert = Vue.component("toast-alert", {
	template:	`<div 	class="sb-toast sb-shadow" 
						:class="[ { 'sb-toast-show': show }, type ]" 
						:style="styleObject"s>
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
				position: "absolute",
				display: "none",
				top: 0,
				left: 0,
				width: "100%",
				zIndex: 10000
			}
		}
	},
	created() {
		this.$eventbus.$on("alert", this.alertHandler);
	},
	methods: {
		alertHandler({ type, message }) {
			if (this.types.indexOf(type) !== -1) this.alert(type, message);
		},
		alert(type, message) {
			this.type = `sb-toast-${ type }`;
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