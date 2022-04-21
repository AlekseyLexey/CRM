import Store from "../core/Store.js";
import Navigator from "../core/Navigator.js";

class Editor {
	_orders = new Store();
	_order = {};

	_navigatior = new Navigator();
	constructor() {
		this._orders.download();

		this._navigatior.subscribe(this.navigation);
		this._navigatior.dispatch(this._navigatior);

		const userInput = document.querySelector('input[data-user="fullname"]');
		const orderTypeInput = document.querySelector('select[data-user="type"]');
		const dateInput = document.querySelector('input[data-user="date"]');
		const statusSelect = document.querySelector('select[data-user="status"]');

		userInput.addEventListener('input', () => {
			this._order.user.name = userInput.value.split(' ')[0];
			this._order.user.surname = userInput.value.split(' ')[1];
		});

		orderTypeInput.addEventListener('change', () => {
			this._order.orderType = orderTypeInput.value;
		});

		dateInput.addEventListener('input', () => {
			this._order.createdAt = new Date(dateInput.value).getTime();
		});

		statusSelect.addEventListener('change', () => {
			this._order.status = statusSelect.value;
		});

		const btn = document.querySelector('button.btn.btn-success');

		const lastOrders = this._orders.lastOrders;

		document.querySelectorAll('a[data-link="lastOrder"]').forEach((elem, i) => {
			elem.innerHTML = `
			<img src="./assets/arrow.png" alt="" style="width: 30px">
			${lastOrders[i].user.name} ${lastOrders[i].user.surname}
			`;

			elem.addEventListener('click', (e) => {
				e.preventDefault();

				location = `/editor.html?orderId=${lastOrders[i].id}`
			})
		})

		btn.addEventListener('click', () => {
			const orderId = parseInt(this._navigatior.get('orderId'), 10);
			this._orders._orders[orderId - 1] = this._order;

			this._orders.upload();

			alert('Changes were done!');

			location = `/index.html`;
		});
	}

	navigation = (navigationInit) => {
		const orderId = parseInt(navigationInit.get('orderId'), 10);

		const order = this._orders.orders[orderId - 1];
		this._order = JSON.parse(JSON.stringify(order));

		const { user, id, orderType, createdAt, status } = order;

		document.querySelector('input[data-user="id"]').value = id;
		document.querySelectorAll('[data-user="fullname"]').forEach(elem => {
			if (elem.value) {
				elem.value = `${user.name} ${user.surname}`;
			} else {
				elem.textContent = `${user.name} ${user.surname}`;
			}
		});
		const statuses = document.querySelector('select[data-user="status"]').getElementsByTagName('option');
		document.querySelector('input[data-user="date"]').valueAsNumber = new Date(createdAt).getTime();

		for (const option of statuses) {
			if (option.value === status) {
				option.selected = true;
			}
		}
	}
}

export default Editor;