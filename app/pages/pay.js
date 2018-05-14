const Pay = Vue.component("pay", {
	template: 	`<section id="pay">
					<pay-form></pay-form>
				</section>`,
	components: {
		"pay-form": PayForm
	}
});