const Waiting = Vue.component("waiting", {
	template:	`<section class="sb-text-white">
					<div class="sb-padding-4 sb-margin-left-2 sb-margin-right-2 sb-text-center">
						<h3 class="sb-text-aqua sb-margin-bottom-4">{{ current.title }}</h3>
						
						<span class="sb-text-white"
							:style="style.process" 
							v-html="current.process">
						</span>
					</div>

					<hr class="sb-hr"/>

					<div class="sb-padding-4 sb-margin-left-2 sb-margin-right-2 sb-text-center">
						<span v-html="current.info"></span>
					</div>

					<hr class="sb-hr"/>

					<waiting-graphic :page="current.graphic"></waiting-graphic>

					<small class="sb-block sb-text-center sb-text-light sb-text-mono sb-weight-light">{{ current.status }}</small>
				</section>`,
	data() {
		return {
			me: {},
			current: {},
			states: {
				ether: {
					title: "Hola!",
					process: "Estamos <span class='sb-text-aqua'>transfiriendo ETHER a tu cuenta de LabCoins para que puedas hacer transacciones.</span>",
					info: "Este proceso <span class='sb-text-aqua sb-block'>puede tardar hasta 1 minuto,</span> pero mientras puedes seguir usando el movil normalmente.",
					graphic: 1,
					status: "Transfiriendo ETHER"
				},
				coins: {
					title: "¡Ya tienes ETHER!",
					process: "Ahora estamos <span class='sb-text-aqua'>usando parte de ese ETHER para transferirte 10 LabCoins.</span>",
					info: "Si nos dejas otro minuto <span class='sb-text-aqua sb-block'>¡lo terminamos!</span>",
					graphic: 2,
					status: "Cargando COINS"
				},
			},
			style: {
				process: { fontSize: "1.2em" }
			}
		}
	},
	created() {
		this.current = this.states.ether;
		this.me = this.$storage.get("user");

		this.$eventbus.$emit("initContract");
		this.$eventbus.$on("contractReady", () => {
			this.unlock();
			this.checkBalance();
			this.checkAutoclaim();
		});
	},
	methods: {
		unlock() {
			let unlocked = this.$web3.personal.unlockAccount(this.me.address, this.me.password);
			if (!unlocked) {
				this.$storage.remove("user");
				this.$storage.remove("artifact");

				this.$eventbus.$emit("alert", {
					type: "danger",
					message: "User logged out."
				});
				Router.push({ name: "signup" });
			}
		},
		checkBalance() {
			let interval = setInterval(() => {
				let balance = this.$web3.eth.getBalance(this.$web3.eth.defaultAccount);
				if (balance.toNumber() > 0) {
					this.current = this.states.coins;
					clearInterval(interval);
				}
			}, 5000);
		},
		checkAutoclaim() {
			try {
				this.$instance.autoclaim(this.me.username);
			} catch(e) {
				console.error(e);
				this.$eventbus.$emit("alert", {
					type: "danger",
					message: "Error claim account."
				});
			}

			let interval = setInterval(() => {
				let registered = this.$instance.isRegistered(this.$web3.eth.defaultAccount);
				let tokens = this.$instance.balanceOf(this.$web3.eth.defaultAccount).toNumber();

				if (registered && tokens > 0) {
					Router.push({ name: "home" });
					clearInterval(interval);
				}
			}, 5000);
		}
	},
	components: {
		"waiting-graphic": WaitingGraphic
	}
});