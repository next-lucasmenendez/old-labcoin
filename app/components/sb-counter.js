let TokensCounter = Vue.component("tokens-counter", {
	template: 	`<div class="sb-counter sb-counter-circular sb-circle" :class="color">
					<span class="sb-border">{{ count }}</span>
					<label v-if="label">{{ label }}</label>
				</div>`,
	props: {
		count: {
			type: Number,
			required: true
		},
		label: {
			type: String,
			required: false
		},
		color: {
			type: String,
			required: false,
			default: "sb-counter-aqua"
		}
	}
});
