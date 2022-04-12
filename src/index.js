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

const navigator = new Navigator(navigatorInit => {
	const page = parseInt(navigatorInit.get('page', 1), 10);

	let orders = store.orders;

	pagination.page = page;
	ot.orders = store.orders.slice((page - 1) * 5, page * 5);
});

const filterBar = new FilterBar({
	orderTypes: 
		"Сковородка Ручка Тетрадка Веревка Мыло Кресло Шина Ноутбук Нож".split(" ")
});

pagination.on('move', nextPage => {
	// pagination.page = nextPage;
	// ot.orders = store.orders.slice((nextPage - 1) * 5, nextPage * 5);

	navigator.set('page', nextPage);
});

filterBar.subscribe(filterBar => {
	for (const [key, value] of Object.entries(filterBar)) {
		if (value) {
			navigator.set(key, value);
		} else {
			navigator.remove(key);
		}
	}
});