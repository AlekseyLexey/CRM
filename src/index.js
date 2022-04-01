import Store from "./core/Store.js";
import Observable from "./core/Observalbe.js";

const store = new Store();
store.download();
store.upload();

const ob = new Observable();

ob.subscribe('sub1');