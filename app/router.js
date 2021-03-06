const Router = new VueRouter({
	//mode: "history",
	routes: [
		{ name: "home", path: "/", component: Home },
		{ name: "signup", path: "/signup", component: SignUp },
		{ name: "scan", path: "/scan", component: Scan },
		{ name: "waiting", path: "/waiting", component: Waiting }
	]
});

Router.beforeEach((to, from, next) => {
	const $storage = new Storage();

	let user = $storage.get("user");
	if (!user && to.path !== "/signup") {
		next("signup");
	} else {
		next();
	}
});