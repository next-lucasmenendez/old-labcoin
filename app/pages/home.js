const Home = Vue.component("home", {
	template: 	`<section id="home">
					<tokens-counter :count="count"></tokens-counter>
				</section>`,
	data() {
		return {
			count: 9
		}
	},
	components: {
		"tokens-counter": TokensCounter
	}
});