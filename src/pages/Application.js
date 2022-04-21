import Store from "../core/Store.js";
import OrdersTable from "../core/OrdersTable.js";
import Paginator from "../core/Paginator.js";
import Navigator from "../core/Navigator.js";
import FilterBar from "../core/FilterBar.js";

class Application {
	_store = new Store();

	_ot = new OrdersTable(
		document.querySelector('[data-mount="ordersTable"]'),
		this._store.orders.slice(0, 5)
	);

	_pagination = new Paginator(
		document.querySelector('[data-mount="pagination"]'),
		Math.ceil(this._store.orders.length / 5),
		1
	);

	_filterBar = new FilterBar({
		orderTypes: 
			"Сковородка Ручка Тетрадка Веревка Мыло Кресло Шина Ноутбук Нож".split(" ")
	});

	_navigator = new Navigator();

	constructor() {
		this._store.download();
		this._store.upload();

		this._pagination.on('move', nextPage => {
			// pagination.page = nextPage;
			// ot.orders = store.orders.slice((nextPage - 1) * 5, nextPage * 5);
	
			this._navigator.set('page', nextPage);
		});

		this._ot.on('edit', (orderId) => {
			let flag = true;

			for (const order of this._store._lastOrders) {
				if (order.id === orderId - 1) {
					flag = !flag;
					break;
				}
			}

			if (flag) {
				this._store._lastOrders.pop();
				this._store._lastOrders.unshift(this._store.orders[orderId - 1]);
				this._store.upload();
			}


			location = `/editor.html?orderId=${orderId}`
		})

		this._navigator.subscribe(this.navigatorInit);
		this._navigator.dispatch(this._navigator);
		this._filterBar.subscribe(this.filterBarHandler);
	
		const filerLinkElements = document.querySelectorAll('a.nav-link[data-action]');

		for (const element of filerLinkElements) {
			element.addEventListener('click', e => {
				e.preventDefault();
				
				let { action, field, value } = element.dataset;
	
				if (action === 'filter') {
					field = `f${field[0].toUpperCase()}${field.slice(1)}`;
					this._navigator.set(field, value);
				}
			});
		}

		const lastOrders = this._store.lastOrders;

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
	}

	navigatorInit = (navigatorInit) => {
		const page = parseInt(navigatorInit.get('page'), 10);

		let orders = this._store.orders;

		if (navigatorInit.has('fName')) {
			const fName = navigatorInit.get('fName');

			orders = orders.filter(
				oreder =>
				oreder.user.name.toLowerCase().includes(fName.toLowerCase()) ||
				oreder.user.surname.toLowerCase().includes(fName.toLowerCase())
			);

			// filterBar._nameInput.value = fName;
		}

		if (navigatorInit.has('fOrderType')) {
			const fOrderType = navigatorInit.get('fOrderType');

			if (fOrderType !== 'all') {
				orders = orders.filter(oreder => oreder.orderType === fOrderType);
			}

			this._filterBar._typeSelect.value = fOrderType;
		}

		if (navigatorInit.has('fStatus')) {
			const fStatus = navigatorInit.get('fStatus');

			if (fStatus !== 'all') {
				orders = orders.filter(oreder => oreder.status === fStatus);
			}

			this._filterBar._statusSelect.value = fStatus;
		}

		if (navigatorInit.has('fMinPrice')) {
			const fMinPrice = navigatorInit.get('fMinPrice');

			orders = orders.filter(oreder => oreder.price >= fMinPrice);
		}

		if (navigatorInit.has('fMaxPrice')) {
			const fMaxPrice = navigatorInit.get('fMaxPrice');

			orders = orders.filter(oreder => oreder.price <= fMaxPrice);
		}

		if (navigatorInit.has('fDateFrom')) {
			const fDateFrom = new Date(navigatorInit.get('fDateFrom'));

			orders = orders.filter(order => fDateFrom <= new Date(order.createdAt));
		}

		if (navigatorInit.has('fDataTo')) {
			const fDataTo = new Date(navigatorInit.get('fDataTo'));

			orders = orders.filter(order => fDataTo >= new Date(order.createdAt));
		}

		this._pagination.pages = Math.ceil(orders.length / 5);
		this._pagination.page = Math.min(page, this._pagination.pages);
		this._ot.orders = orders.slice(
			(this._pagination.page - 1) * 5,
			this._pagination.page * 5
		);
	}

	filterBarHandler = (filterBarHandler) => {
		for (const [key, value] of Object.entries(filterBarHandler)) {
			if (value) {
				this._navigator.set(key, value);
			} else {
				this._navigator.remove(key);
			}
		}
	}
}

export default Application;