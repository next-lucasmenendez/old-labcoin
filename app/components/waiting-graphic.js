const WaitingGraphic = Vue.component("waiting-graphic", {
	template:	`<div class="sb-margin-top-2 sb-margin-bottom-2 sb-padding-4 sb-text-center">
					<?xml version="1.0" encoding="UTF-8"?>
					<svg width="245px" height="42px" viewBox="0 0 245 42" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
						<g v-if="page == 1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<g transform="translate(-64.000000, -478.000000)">
								<g transform="translate(65.000000, 479.000000)">
									<path style="animation: fade 1.5s infinite;" d="M17.5514403,4.00704375 C17.5086312,4.00704375 17.4674075,4 17.4245983,4 C4.59928679,4 -1.82367489,21.2219697 7.24552798,31.2945327 C10.2421702,34.6227048 13.9412,36.0613908 17.5514403,35.997997 L17.5514403,4.00704375 Z" id="Fill-1" fill="#FFFFFF" transform="translate(11, 20) rotate(-360) translate(-10, -20) "></path>
									<circle stroke="#FFFFFF" cx="20" cy="20" r="20"></circle>
									<circle stroke="#FFFFFF" cx="223" cy="20" r="20"></circle>
									<path d="M41.5,20.5 L202.611762,20.5" stroke="#FFFFFF" stroke-linecap="square"></path>
								</g>
							</g>
						</g>
						<g v-if="page == 2" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
							<g transform="translate(-64.000000, -476.000000)">
								<g transform="translate(65.000000, 477.000000)">
									<circle stroke="#2DCCCD" cx="20" cy="20" r="20"></circle>
									<circle fill="#2DCCCD" cx="20" cy="20" r="16"></circle>
									<circle stroke="#FFFFFF" cx="223" cy="20" r="20"></circle>
									<path d="M41.5,20.5 L202.611762,20.5" id="Line-2" stroke="#2DCCCD" stroke-linecap="square"></path>
									<g transform="translate(8.000000, 8.000000)">
										<mask fill="white">
											<path d="M0,11.9743081 C0,18.5867532 5.24291523,23.9479672 11.710087,23.9479672 C18.1772588,23.9479672 23.4195394,18.5867532 23.4195394,11.9743081 C23.4195394,5.36121397 18.1772588,0 11.710087,0 C5.24291523,0 0,5.36121397 0,11.9743081 L0,11.9743081 Z" id="path-1"></path>
										</mask>
										<use fill="#2DCCCD" xlink:href="#path-1"></use>
										<path d="M17.6729947,8.900239 L11.248985,16.3323241 C11.0434167,16.5695183 10.7607602,16.674938 10.4781038,16.674938 C10.2468395,16.674938 10.0155751,16.5958732 9.83570285,16.4377438 L5.80142473,13.1433798 C5.36459207,12.774411 5.28750395,12.1155382 5.6472485,11.6675047 C6.00699304,11.2194712 6.64939402,11.1404065 7.08622668,11.5093753 L10.3496236,14.1975763 L16.1312324,7.50342868 C16.516673,7.05539518 17.1590739,7.02904027 17.5702106,7.42436394 C18.0070432,7.79333271 18.0584353,8.4522055 17.6729947,8.900239" fill="#FFFFFF"></path>
									</g>
									<path style="animation: fade 1.5s infinite;" d="M222.55144,4.00704375 C222.508631,4.00704375 222.467408,4 222.424598,4 C209.599287,4 203.176325,21.2219697 212.245528,31.2945327 C215.24217,34.6227048 218.9412,36.0613908 222.55144,35.997997 L222.55144,4.00704375 Z" fill="#FFFFFF" transform="translate(215.275720, 20.000000) rotate(-360.000000) translate(-216, -20) "></path>
								</g>
							</g>
						</g>
					</svg>
				</div>`,
	props: {
		page: {
			type: Number,
			default: 1,
			required: true
		}
	}
});