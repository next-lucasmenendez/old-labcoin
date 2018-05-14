const SignUp = Vue.component("signup", {
	template: 	`<section id="signup">
					<signup-form></signup-form>
				</section>`,
	components: {
		"signup-form": SignupForm
	}
})