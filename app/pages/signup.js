const SignUp = Vue.component("signup", {
	template: 	`<section class="sb-grid sb-justify-center sb-align-center sb-wrap sb-margin-top-4 sb-margin-bottom-4">
					<div class="sb-col-10 sb-text-center">
						<div class="sb-margin-top-4 sb-margin-bottom-4 sb-padding-top-2 sb-padding-bottom-2">
							<h2 class="sb-h4 sb-text-aqua">Crea tu nickname</h2>
							<hr class="sb-bg-gray sb-margin-top-3 sb-margin-bottom-3">
							<p class="sb-text-white">Crea tu nickname para el evento y recibe <span class="sb-text-aqua">LabCoin</span>'s gratis para conseguir regalos en los diferentes stands.</p>
						</div>
						
						<signup-form></signup-form>
					</div>
				</section>`,
	components: {
		"signup-form": SignupForm
	}
})