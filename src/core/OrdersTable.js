const ordersTableTemplate = document.querySelector('template[data-template="ordersTable"]');
const orderRowTemplate = document.querySelector('template[data-row="orderRow"]');

const priceFormater = new Intl.NumberFormat("ru-RU", {
	style: "currency",
	currency: "RUB",
});

const dateFormater = new Intl.DateTimeFormat("ru-Ru", {
	hour12: false,
	year: "numeric",
	month: "long",
	day: "numeric",
	hour: "numeric",
	minute: "numeric",
});

class OrdersTable {
	_root = null;
	_orders = [];

	constructor(root, orders) {
		this._root = root;
		this._orders = orders;

		this.update();
	}

	update() {
		this._root.textContent = '';
		const ordersTableTemplateClone = ordersTableTemplate.content.cloneNode(true);
		const tbody = ordersTableTemplateClone.querySelector('tbody');

		for (const order of this._orders) {
			const { id, user, orderType, price, status, createdAt } = order;
			const { name, surname } = user;

			const orderRowTemplateClone = orderRowTemplate.content.cloneNode(true);

			orderRowTemplateClone.querySelector('[data-field="id"]').textContent = id;

			orderRowTemplateClone.querySelector('[data-field="nameSurname"]').textContent = `${name} ${surname}`;

			orderRowTemplateClone.querySelector('[data-field="type"]').textContent = orderType;

			orderRowTemplateClone.querySelector('[data-field="price"]').textContent = priceFormater.format(price);

			orderRowTemplateClone.querySelector('[data-field="date"]').textContent = dateFormater.format(new Date(createdAt));

			tbody.append(orderRowTemplateClone);
		}

		this._root.append(tbody);
	}
}

export default OrdersTable;