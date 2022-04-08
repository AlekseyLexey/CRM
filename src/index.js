import Store from "./core/Store.js";
import Observable from "./core/Observalbe.js";
import EventEmitter from "./core/EventEmitter.js";
import OrdersTable from "./core/OrdersTable.js";
import Paginator from "./core/Paginator.js";

const store = new Store();
store.download();
store.upload();

console.log(store._orders);

const ot = new OrdersTable(document.querySelector('[data-mount="ordersTable"]'), store.orders.slice(0, 5));
const pagination = new Paginator(
	document.querySelector('[data-mount="pagination"]'),
	Math.ceil(store.orders.length / 5),
	1
);

pagination.on('move', number => {
	pagination.page = number;
	ot.orders = store.orders.slice((number - 1) * 5, number * 5);
});