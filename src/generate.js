const names = "Алексей Сергей Олег Петр Виктор Константин Василий".split(" ");
const surnames = "Соколов Соловье Вихта Мельник Раков Лепко Саван".split(" ");
const orderTypes =
	"Сковородка Ручка Тетрадка Веревка Мыло Кресло Шина Ноутбук Нож".split(" ");
const statuses = "new process back archived".split(" ");

const getRandomFrom = (array) => {
	const index = Math.floor(Math.random() * array.length);
	return array[index];
};

const getRandom = (min, max) => {
	return min + Math.floor(Math.random() * (max - min + 1));
};

const getRandomDate = (formDate, toDate) => {
	const fromTimestamp = new Date(formDate).getTime();
	const toTimestamp = new Date(toDate).getTime();
	return new Date(getRandom(fromTimestamp, toTimestamp));
};

const dateNow = new Date();
const weekAgo = new Date(dateNow.getTime() - 7 * 24 * 60 * 60 * 1000);

const generateUser = () => {
	return {
		name: getRandomFrom(names),
		surname: getRandomFrom(surnames)
	};
};

const generateOrder = () => {
	return {
		user: generateUser(),
		orderType: getRandomFrom(orderTypes),
		price: getRandom(1000, 5000),
		status: getRandomFrom(statuses),
		createdAt: getRandomDate(weekAgo, dateNow)
	};
};

const generate = (n = 1) => 
	Array(n)
	.fill()
	.map(generateOrder)
	.sort((a, b) => a.createdAt - b.createdAt)
	.map((order, i) => ({
		id: ++i,
		...order,
	}));

// [
// 	{"id":1,"user":{"name":"Олег","surname":"Вихта"},"orderType":"Шина","price":2435,"status":"new","createdAt":"2022-03-24T01:27:09.378Z"},
// 	{"id":2,"user":{"name":"Олег","surname":"Соловье"},"orderType":"Ноутбук","price":4190,"status":"new","createdAt":"2022-03-24T19:08:54.587Z"},
// 	{"id":3,"user":{"name":"Петр","surname":"Вихта"},"orderType":"Ноутбук","price":2538,"status":"new","createdAt":"2022-03-24T19:14:24.319Z"},
// 	{"id":4,"user":{"name":"Олег","surname":"Соловье"},"orderType":"Шина","price":3573,"status":"new","createdAt":"2022-03-25T08:54:29.509Z"},
// 	{"id":5,"user":{"name":"Сергей","surname":"Мельник"},"orderType":"Ручка","price":3315,"status":"archived","createdAt":"2022-03-25T17:34:34.232Z"},
// 	{"id":6,"user":{"name":"Константин","surname":"Мельник"},"orderType":"Веревка","price":1593,"status":"process","createdAt":"2022-03-25T22:15:35.382Z"},
// 	{"id":7,"user":{"name":"Сергей","surname":"Вихта"},"orderType":"Мыло","price":2400,"status":"back","createdAt":"2022-03-26T23:46:07.997Z"},
// 	{"id":8,"user":{"name":"Олег","surname":"Лепко"},"orderType":"Ручка","price":3928,"status":"process","createdAt":"2022-03-26T23:51:56.661Z"},
// 	{"id":9,"user":{"name":"Константин","surname":"Раков"},"orderType":"Сковородка","price":4753,"status":"archived","createdAt":"2022-03-27T10:50:03.196Z"},
// 	{"id":10,"user":{"name":"Василий","surname":"Саван"},"orderType":"Кресло","price":4394,"status":"archived","createdAt":"2022-03-27T18:00:54.872Z"},
// 	{"id":11,"user":{"name":"Василий","surname":"Раков"},"orderType":"Тетрадка","price":1959,"status":"new","createdAt":"2022-03-28T02:12:23.497Z"},
// 	{"id":12,"user":{"name":"Сергей","surname":"Лепко"},"orderType":"Мыло","price":2701,"status":"archived","createdAt":"2022-03-28T11:22:21.037Z"},
// 	{"id":13,"user":{"name":"Олег","surname":"Вихта"},"orderType":"Тетрадка","price":2410,"status":"new","createdAt":"2022-03-29T16:55:17.165Z"},
// 	{"id":14,"user":{"name":"Петр","surname":"Соловье"},"orderType":"Ручка","price":2402,"status":"archived","createdAt":"2022-03-30T06:21:50.679Z"},
// 	{"id":15,"user":{"name":"Олег","surname":"Лепко"},"orderType":"Сковородка","price":2151,"status":"archived","createdAt":"2022-03-30T08:33:46.090Z"}
// ]