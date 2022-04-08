import Store from "./core/Store.js";
import Observable from "./core/Observalbe.js";
import EventEmitter from "./core/EventEmitter.js";
import OrdersTable from "./core/OrdersTable.js";

const store = new Store();
store.download();
store.upload();

console.log(store._orders);

const ot = new OrdersTable(document.querySelector('[data-mount="ordersTable"]'), store.orders.slice(0, 5));


ot.on('edit', (id) => console.log(id));