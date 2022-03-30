const APPLICATION_KEY = "__crm_app__";

class Store {
	_orders = [];

	get orders() {
		return JSON.parse(JSON.stringify(this._orders));
	}

	upload() {
		const orders = JSON.stringify(this._orders);
		localStorage.setItem(APPLICATION_KEY, orders);
	}

	download() {
		
	}
}

export default Store;