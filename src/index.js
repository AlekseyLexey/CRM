import Store from "./core/Store.js";
import OrdersTable from "./core/OrdersTable.js";
import Paginator from "./core/Paginator.js";
import Navigator from "./core/Navigator.js";
import FilterBar from "./core/FilterBar.js";

const store = new Store();
store.download();
store.upload();

console.log(store._orders);

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

		filterBar._nameInput.value = fName;
	}

	if (navigatorInit.has('fOrderType')) {
		const fOrderType = navigatorInit.get('fOrderType');
		if (fOrderType !== 'Все') {
			orders = orders.filter(oreder => oreder.orderType === fOrderType);
			// console.log(orders);
		}
		filterBar._typeSelect.value = fOrderType;
	}

	// if (navigatorInit.has('fName')) {
	// 	const fName = navigatorInit.get('fName');
	// 	console.log(`${fName.toLowerCase()} `.length);

	// 	orders = orders.filter(
	// 		oreder =>
	// 		oreder.user.name.toLowerCase().includes(fName.toLowerCase()) ||
	// 		oreder.user.name.toLowerCase().includes(`${fName.toLowerCase()} `) ||
	// 		oreder.user.surname.toLowerCase().includes(fName.toLowerCase())
	// 	);

	// 	filterBar._nameInput.value = fName;
	// }

	pagination.pages = Math.ceil(orders.length / 5);
	pagination.page = Math.min(page, pagination.pages);
	ot.orders = orders.slice(
		(pagination.page - 1) * 5,
		pagination.page * 5
	);
	console.log(ot.orders);
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