let Tilling = Vue.component("tilling", {
	template: 	`<div class="sb-inline-block sb-width-100 sb-margin-top-4 sb-margin-bottom-4">
					<div class="sb-grid sb-wrap">
						<div class="sb-inline-block sb-width-20">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
								<path :style="{ fill: count > 0 ? '#8f7ae5' : '#64615e' }" d="M0,0H64a0,0,0,0,1,0,0V10A54,54,0,0,1,10,64H0a0,0,0,0,1,0,0V0A0,0,0,0,1,0,0Z" transform="translate(64 64) rotate(180)" />
								<path :style="{ fill: count > 0 ? '#2dcccd' : '#d2d1ce' }" d="M64,0H0V64A64,64,0,0,1,64,0Z" />
							</svg>
						</div>
						<div class="sb-inline-block sb-width-20">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
								<rect :style="{ fill: count > 1 ? '#004481' : '#fff' }" y="31" width="64" height="33" transform="translate(64 95) rotate(180)" />
								<polygon :style="{ fill: count > 1 ? '#8f7ae5' : '#64615e' }" points="0 0 0 32 32 32 0 0" />
    							<polygon :style="{ fill: count > 1 ? '#49a5e6' : '#bdbdba' }" points="32 0 32 32 64 32 32 0" />
							</svg>
						</div>
						<div class="sb-inline-block sb-width-20">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
								<polygon :style="{ fill: count > 2 ? '#8f7ae5' : '#64615e' }" points="0 0 0 64 64 64 64 31 33 0 0 0" />
							</svg>
						</div>
						<div class="sb-inline-block sb-width-20">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
								<polyline :style="{ fill: count > 3 ? '#49a5e6' : '#bdbdba' }" points="0 64 64 64 64 0" />
								<path :style="{ fill: count > 3 ? '#8f7ae5' : '#64615e' }" d="M49,54.08h0A9.08,9.08,0,0,0,39.92,45h0A9.08,9.08,0,0,0,33.5,60.5h0A9.08,9.08,0,0,0,49,54.08Z" />
								<polyline :style="{ fill: count > 3 ? '#2dcccd' : '#d2d1ce' }" points="64 0 0 0 0 64" />
							</svg>
						</div>
						<div class="sb-inline-block sb-width-20">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
								<rect :style="{ fill: count > 4 ? '#004481' : '#fff' }" width="64" height="64" transform="translate(64 64) rotate(180)" />
								<polygon :style="{ fill: count > 4 ? '#8f7ae5' : '#64615e' }" points="0 33 0 64 31 64 0 33" />
							</svg>
						</div>
						<div class="sb-inline-block sb-width-20" style="margin-top: -4px">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
								<polygon :style="{ fill: count > 5 ? '#004481' : '#fff' }" points="32 0 32 32 0 0 0 0 0 64 64 64 64 0 32 0" />
								<polygon :style="{ fill: count > 5 ? '#49a5e6' : '#bdbdba' }" points="64 33 64 64 32 64 64 33" />
							</svg>
						</div>
						<div class="sb-inline-block sb-width-20" style="margin-top: -4px">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
								<rect :style="{ fill: count > 6 ? '#004481' : '#fff' }" x="32" width="32" height="64" transform="translate(96 64) rotate(180)" />
								<rect :style="{ fill: count > 6 ? '#8f7ae5' : '#64615e' }" width="32" height="64" transform="translate(32 64) rotate(180)" />
								<polygon :style="{ fill: count > 6 ? '#49a5e6' : '#bdbdba' }" points="0 33 0 64 32 64 0 33" />
							</svg>
						</div>
						<div class="sb-inline-block sb-width-20" style="margin-top: -4px">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
								<path :style="{ fill: count > 7 ? '#004481' : '#fff' }" d="M0,0H64a0,0,0,0,1,0,0V64a0,0,0,0,1,0,0h0A64,64,0,0,1,0,0V0A0,0,0,0,1,0,0Z" />
								<polygon :style="{ fill: count > 7 ? '#2dcccd' : '#d2d1ce' }" points="64 31 64 0 33 0 64 31" />
							</svg>
						</div>
						<div class="sb-inline-block sb-width-20" style="margin-top: -4px">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
								<rect :style="{ fill: count > 8 ? '#004481' : '#fff' }" width="64" height="64" />
								<rect :style="{ fill: count > 8 ? '#8f7ae5' : '#64615e' }" width="32" height="64" />
								<polygon :style="{ fill: count > 8 ? '#49a5e6' : '#bdbdba' }" points="32 0 0 0 0 31 32 0" />
								<path :style="{ fill: count > 8 ? '#8f7ae5' : '#64615e' }" d="M64,24h-.08A9.08,9.08,0,0,0,57.5,39.5h0A8.88,8.88,0,0,0,64,42.17Z" />
							</svg>
						</div>
						<div class="sb-inline-block sb-width-20" style="margin-top: -4px">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
								<path :style="{ fill: count > 9 ? '#004481' : '#fff' }" d="M0,0V24a8.87,8.87,0,0,1,6.32,2.67h0A9.08,9.08,0,0,1,0,42.17V64H64V0Z" />
								<rect :style="{ fill: count > 9 ? '#49a5e6' : '#bdbdba' }" x="32" width="32" height="64" transform="translate(96 64) rotate(180)" />
								<polygon :style="{ fill: count > 9 ? '#8f7ae5' : '#64615e' }" points="32 64 64 64 64 33 32 64" />
							</svg>
						</div>
					</div>
				</div>`,
	props: {
		count: {
			type: Number,
			required: true
		}
	}
})