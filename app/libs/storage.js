class Storage {
	constructor() {
		if (window.localStorage) {
			this.storage = window.sessionStorage || window.localStorage;
		}
	}

	set(key, value) {
		if (typeof value === 'object' && (value.constructor === Array || value.constructor === Object)) {
			value = JSON.stringify(value);
		}

		this.storage.setItem(key, value);
	}

	remove(key) {
		this.storage.removeItem(key);
	}

	get(key) {
		let raw = this.storage.getItem(key),
			value = false;

		if (raw) {
			try {
				value = JSON.parse(raw);
			} catch (e) {
				value = raw;
			}
		}

		return value;
	}
}