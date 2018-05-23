let TokensCounter = Vue.component("tokens-counter", {
	template: 	`<div class="sb-counter sb-counter-circular sb-circle sb-border-aqua">
					<span>{{ count }}</span>
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
		}
	}
});
