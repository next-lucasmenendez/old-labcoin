let SBInput = Vue.component("sb-input",  {
	template:  `<div class="sb-input" v-bind:class="cclass">
					<input 	:type="type" 
							:pattern="pattern" 
							:name="name" 
							:autocomplete="autocomplete ? 'on' : 'off'"
							v-model="value" 
							@change="$parent.$emit('change', { name, value })" 
							placeholder=" ">

					<label 	v-if="label" 
							:for="name"> 
								{{ label }}
					</label>
					
					<span v-if="invalid">
						{{ invalid }}
					</span>
				</div>`,
	props: {
		name: {
			type: String,
			required: true
		},
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
		autocomplete: {
			type: Boolean,
			default: false
		},
		model: {
			type: String,
			required: false
		}
	},
	data() {
		return {
			value: this.model
		}
	}
});