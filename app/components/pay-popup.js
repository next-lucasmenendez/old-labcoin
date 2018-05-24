const PayPopup = Vue.component("pay-popup", {
	template:	`<div	class="sb-center-absolute sb-width-80 sb-text-center sb-bg-white sb-padding-3 sb-radius-1 sb-shadow"
						v-if="transaction">
					<span></span> 
					<p>¿Quieres gastar un token en '{{ transaction.productName }}'?</p>
					<img class="db-inline-block sb-width-50" :src="transaction.productThumbnail">

					<hr class="sb-hr sb-hr-light sb-margin-top-4 sb-margin-bottom-4">
					
					<button type="button" class="sb-button sb-button-block" @click="payIt">Comprar</button>
					<button type="button" class="sb-button sb-button-block sb-button-outline" @click="cancel">Cancelar</button>
				</div>`,
	props: {
		transaction: {
			type: Object,
			default() { return false; }
		}
	},
	methods: {
		payIt() {
			console.log(this.transaction);
			this.$parent.$emit("payCompleted");
		},
		cancel() {
			console.error(this.transaction);
			this.$parent.$emit("payCanceled");
		}
	}
});