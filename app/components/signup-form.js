const SignupForm = Vue.component("signup-form", {
	template:	`<form class="sb-grid sb-column sb-align-center">
					<sb-input class="sb-col-10 sb-margin-bottom-4" pattern="[A-Za-z]+.*" label="Nombre de usuario" invalid="Formato invalido"></sb-input>
					<div class="sb-col-10">
						<button type="button" class="sb-button sb-width-100">Crear cuenta</button>
					</div>
				</form>`,
	components: {
		"sb-input": SBInput
	}
});