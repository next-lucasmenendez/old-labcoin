let SBInput = Vue.component("sb-input",  {
	template:  `<div class="sb-input" v-bind:class="cclass">
					<input v-bind:type="type" placeholder=" " v-bind:pattern="pattern">
					<label v-if="label">{{ label }}</label>
					<span v-if="invalid">{{ invalid }}</span>
				</div>`,
	props: {
		cclass: {
			type: String,
			required: false
		},
		type: {
			type: String,
			required: false,
			default: "text"
		},
		pattern: {
			type: String,
			required: false
		},
		label: {
			type: String,
			required: false
		},
		invalid: {
			type: String,
			required: false
		},
	}
})