import Store from "../core/Store.js";

class NewOrder {
	_orders = new Store();

	constructor() {
		this._orders.download();

		const newOrder = {
			id: this._orders._orders.length,
			user: {
				name: null,
				surname: null
			},
			orderType: null,
			price: this.getRandom(1000, 5000),
			status: 'new',
			createdAt: new Date().getTime()
		};

		document.querySelector('input[data-field="fullName"]').addEventListener('input', (e) => {
			newOrder.user.name = e.target.value.split(' ')[0];
			newOrder.user.surname = e.target.value.split(' ')[1];
		})

		document.querySelector('select[data-field="orderType"]').addEventListener('change', (e) => {
			newOrder.orderType = e.target.value;
		})

		const success = document.querySelector('button.btn-success');

		success.addEventListener('click', () => {
			this._orders._orders.push(newOrder);
			this._orders.upload();

			location = `/index.html`;
		});
		console.log(this._orders);
	}

	getRandom(max, min) {
		return min + Math.floor(Math.random() * (max - min + 1));
	}
}

export default NewOrder;