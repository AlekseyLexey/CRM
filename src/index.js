import Store from "./core/Store.js";
import Observable from "./core/Observalbe.js";
import EventEmitter from "./core/EventEmitter.js";

const store = new Store();
store.download();
store.upload();

// const ob = new Observable();

// ob.subscribe((a) => console.log('Alex', a));
// ob.subscribe((b) => console.log('Kate', b));

// ob.dispatch();

const ee = new EventEmitter();

ee.addEventListener('click', handlerOne);
ee.on('focus', (f) => console.log(f));

function handlerOne() {
	console.log(123);
}

// ee.removeEventListener('click', handlerOne);

ee.emit('click', 'ClockOn');
ee.emit('focus', 'da');