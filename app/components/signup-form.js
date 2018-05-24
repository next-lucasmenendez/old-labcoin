const SignupForm = Vue.component("signup-form", {
	template:	`<form 	class="sb-grid sb-column sb-align-center" 
						@submit.prevent="$parent.$emit('signin', fields)"">

					<sb-input 	name="username" 
								:model="data.username" 
								class="sb-col-10 sb-margin-bottom-4" 
								pattern="[A-Za-z]+.*" 
								label="Nombre de usuario" 
								invalid="Formato invalido">
					</sb-input>

					<div class="sb-col-10">
						<button type="submit" 
								class="sb-button sb-width-100">
									Crear cuenta
						</button>
					</div>
				</form>`,
	props: {
		data: {
			type: Object,
			required: false,
			default() { return {} }
		},
	},
	data() {
		return {
			fields: {}
		}
	},
	created() {
		this.$on("change", this.changeHandler);
	},
	methods: {
		changeHandler(data) {
			this.fields[data.name] = data.value;
		}
	},
	components: {
		"sb-input": SBInput
	}
});