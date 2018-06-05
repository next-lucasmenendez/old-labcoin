let Tilling = Vue.component("tilling", {
	template: 	`<div class="sb-inline-block sb-width-100 sb-margin-top-4 sb-margin-bottom-4">
					<div class="sb-grid sb-wrap">
						<div class="sb-inline-block sb-width-20">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
								<path :fill="stands.one.done ? '#004481' : '#ffffff'" d="M0,0V24a8.87,8.87,0,0,1,6.32,2.67h0A9.08,9.08,0,0,1,0,42.17V64H64V0Z" />
								<rect :fill="stands.one.done ? '#49a5e6' : '#bdbdba'" x="32" width="32" height="64" transform="translate(96 64) rotate(180)" />
								<polygon fill="stands.one.done ? '#8f7ae5' : '#64615e'" points="32 64 64 64 64 33 32 64" />
							</svg>
						</div>
						<div class="sb-inline-block sb-width-20">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
								<rect :fill="stands.two.done ? '#004481' : '#ffffff'" x="32.05" y="0.05" width="31.95" height="63.9" />
								<rect :fill="stands.two.done ? '#8f7ae5' : '#64615e'" y="-0.02" width="32.02" height="64.03" />
								<path :fill="stands.two.done ? '#ffffff' : '#ffffff'" d="M32,42.17h.08a9.08,9.08,0,0,0,6.42-15.51h0A8.89,8.89,0,0,0,32,24Z" />
							</svg>
						</div>
						<div class="sb-inline-block sb-width-20">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
								<polyline :fill="stands.three.done ? '#2dcccd' : '#d2d1ce'" points="32 64 64 64 64 0 32 0" />
								<polygon :fill="stands.three.done ? '#49a5e6' : '#bdbdba'" points="0 0 0 64 32 64 32 32 32 0 0 0" />
								<polygon :fill="stands.three.done ? '#004481' : '#ffffff'" points="32 64 64 64 64 0 64 0 32 32 64 32 32 64" />
								<path :fill="stands.three.done ? '#8f7ae5' : '#64615e'" d="M25.09,18.81h0A9.08,9.08,0,0,0,16,9.73h0a9.08,9.08,0,0,0-6.42,15.5h0A9.08,9.08,0,0,0,25.09,18.81Z" />
							</svg>
						</div>
						<div class="sb-inline-block sb-width-20">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
								<path :fill="stands.four.done ? '#8f7ae5' : '#64615e'" d="M0,0H64a0,0,0,0,1,0,0V45.05A18.95,18.95,0,0,1,45.05,64H0a0,0,0,0,1,0,0V0A0,0,0,0,1,0,0Z" transform="translate(64 64) rotate(180)" />
								<path :fill="stands.four.done ? '#49a5e6' : '#d2d1ce'" d="M64,0H0V64A64,64,0,0,1,64,0Z" />
							</svg>
						</div>
						<div class="sb-inline-block sb-width-20">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
								<rect :fill="stands.four.done ? '#004481' : '#ffffff'" y="32" width="64" height="32" transform="translate(64 96) rotate(180)" />
								<polygon :fill="stands.four.done ? '#8f7ae5' : '#64615e'" points="0 0 0 32 32 32 0 0" />
								<polygon :fill="stands.four.done ? '#49a5e6' : '#bdbdba'" points="32 0 32 32 64 32 32 0" />
							</svg>
						</div>
						<div class="sb-inline-block sb-width-20" style="margin-top: -4px">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
								<polyline :fill="stands.five.done ? '#2dcccd' : '#d2d1ce'" points="64 0 0 0 0 64" />
								<polyline :fill="stands.five.done ? '#49a5e6' : '#bdbdba'" points="32 64 64 64 64 0 0 64" />
								<path :fill="stands.five.done ? '#8f7ae5' : '#64615e'" d="M49.39,54.9h0a9.08,9.08,0,0,0-9.08-9.08h0a9.08,9.08,0,0,0-6.42,15.5h0A9.08,9.08,0,0,0,49.39,54.9Z" />
							</svg>
						</div>
						<div class="sb-inline-block sb-width-20" style="margin-top: -4px">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
								<path :fill="stands.six.done ? '#004481' : '#ffffff'" d="M0,0H64a0,0,0,0,1,0,0V64a0,0,0,0,1,0,0h0A64,64,0,0,1,0,0V0A0,0,0,0,1,0,0Z" />
								<polygon :fill="stands.six.done ? '#2dcccd' : '#d2d1ce'" points="64 31 64 0 33 0 64 31" />
							</svg>
						</div>
						<div class="sb-inline-block sb-width-20" style="margin-top: -4px">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
								<polygon :fill="stands.seven.done ? '#2dcccd' : '#d2d1ce'" points="64 64 64 0 0 0 0 31 31 64 64 64" />
								<path :fill="stands.seven.done ? '#8f7ae5' : '#64615e'" d="M32,41.51h0a9.08,9.08,0,0,0-9.08-9.08h0a9.08,9.08,0,0,0-6.42,15.5h0A9.08,9.08,0,0,0,32,41.51Z" />
							</svg>
						</div>
						<div class="sb-inline-block sb-width-20" style="margin-top: -4px">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
								<polygon :fill="stands.eight.done ? '#004481' : '#ffffff'" points="0 32 0 64 64 64 64 64 32 32 32 64 0 32" />
								<polygon :fill="stands.eight.done ? '#004481' : '#ffffff'" points="64 0 0 0 0 32 32 32 64 32 64 0" />
							</svg>
						</div>
						<div class="sb-inline-block sb-width-20" style="margin-top: -4px">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
								<rect :fill="stands.eight.done ? '#004481' : '#ffffff'" width="64" height="64" />
								<rect :fill="stands.eight.done ? '#8f7ae5' : '#64615e'" width="32" height="64" />
								<polygon :fill="stands.eight.done ? '#49a5e6' : '#bdbdba'" points="32 0 0 0 0 31 32 0" />
								<path :fill="stands.eight.done ? '#8f7ae5' : '#64615e'" d="M64,24h-.08A9.08,9.08,0,0,0,57.5,39.5h0A8.88,8.88,0,0,0,64,42.17Z" />
							</svg>
						</div>
					</div>
				</div>`,
	props: {
		confirmedStands: {
			type: Array,
			required: true
		}
	},
	data() {
		return {
			confirmed: [],
			stands: {
				one: { 
					done: false,
					address: "0x423a9c5598356216340856d13265f6a000000001"
				},
				two: {
					done: false,
					address: "0x423a9c5598356216340856d13265f6a000000002"
				},
				three: {
					done: false,
					address: "0x423a9c5598356216340856d13265f6a000000003"
				},
				four: {
					done: false,
					address: "0x423a9c5598356216340856d13265f6a000000004"
				},
				five: {
					done: false,
					address: "0x423a9c5598356216340856d13265f6a000000005"
				},
				six: {
					done: false,
					address: "0x423a9c5598356216340856d13265f6a000000006"
				},
				seven: {
					done: false,
					address: "0x423a9c5598356216340856d13265f6a000000007"
				},
				eight: {
					done: false,
					address: "0x423a9c5598356216340856d13265f6a000000008"
				},
			}
		}
	},
	watch: {
		confirmedStands(newConfirmed) {
			newConfirmed.forEach(item => {
				if (this.confirmed.indexOf(item.standAddress) == -1) this.confirmed.push(item.standAddress);
			});
		},
		confirmed(newConfirmed) {
			Object.keys(this.stands).forEach(key => {
				let stand = this.stands[key];
				if (!stand.done && newConfirmed.indexOf(stand.address) != -1)
					this.stands[key].done = true;
			});
		}
	},
	created() {
		Object.keys(this.stands).forEach(key => {
			let stand = this.stands[key];
			if (!stand.done && this.confirmed.indexOf(stand.address) != -1)
				this.stands[key].done = true;
		});
	}
})