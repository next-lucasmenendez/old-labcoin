let TokensCounter = Vue.component("tokens-counter", {
	template: 	`<div class="sb-counter sb-counter-circular sb-circle sb-border-aqua">
					<span class="sb-border" :class="{ 'sb-text-red': count == 0, 'sb-border-red': count == 0 }">{{ count }}</span>
					<label v-if="label" :class="{ 'sb-text-red': count == 0 }">{{ label }}</label>
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
