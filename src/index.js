import Store from "./core/Store.js";
import OrdersTable from "./core/OrdersTable.js";
import Paginator from "./core/Paginator.js";
import Navigator from "./core/Navigator.js";
import FilterBar from "./core/FilterBar.js";

const store = new Store();
store.download();
store.upload();

const ot = new OrdersTable(
	document.querySelector('[data-mount="ordersTable"]'),
	store.orders.slice(0, 5)
);

const pagination = new Paginator(
	document.querySelector('[data-mount="pagination"]'),
	Math.ceil(store.orders.length / 5),
	1
);

const filterBar = new FilterBar({
	orderTypes: 
		"Сковородка Ручка Тетрадка Веревка Мыло Кресло Шина Ноутбук Нож".split(" ")
});

const navigator = new Navigator(navigatorInit => {
	const page = parseInt(navigatorInit.get('page'), 10);

	let orders = store.orders;

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

		filterBar._typeSelect.value = fOrderType;
	}

	if (navigatorInit.has('fStatus')) {
		const fStatus = navigatorInit.get('fStatus');

		if (fStatus !== 'all') {
			orders = orders.filter(oreder => oreder.status === fStatus);
		}

		filterBar._statusSelect.value = fStatus;
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

	pagination.pages = Math.ceil(orders.length / 5);
	pagination.page = Math.min(page, pagination.pages);
	ot.orders = orders.slice(
		(pagination.page - 1) * 5,
		pagination.page * 5
	);
});

pagination.on('move', nextPage => {
	// pagination.page = nextPage;
	// ot.orders = store.orders.slice((nextPage - 1) * 5, nextPage * 5);

	navigator.set('page', nextPage);
});

filterBar.subscribe(filterBarHandler => {
	for (const [key, value] of Object.entries(filterBarHandler)) {
		if (value) {
			navigator.set(key, value);
		} else {
			navigator.remove(key);
		}
	}
});

const filerLinkElements = document.querySelectorAll('a.nav-link[data-action]');

for (const element of filerLinkElements) {
	element.addEventListener('click', e => {
		e.preventDefault();
		
		let { action, field, value } = element.dataset;

		if (action === 'filter') {
			field = `f${field[0].toUpperCase()}${field.slice(1)}`;
			navigator.set(field, value);
		}
	});
}