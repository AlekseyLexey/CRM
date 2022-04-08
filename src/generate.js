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
// 	{"id":1,"user":{"name":"Константин","surname":"Соколов"},"orderType":"Ноутбук","price":2340,"status":"archived","createdAt":"2022-04-01T23:00:19.334Z"},
// 	{"id":2,"user":{"name":"Сергей","surname":"Вихта"},"orderType":"Кресло","price":1854,"status":"archived","createdAt":"2022-04-02T00:01:57.384Z"},
// 	{"id":3,"user":{"name":"Алексей","surname":"Соловье"},"orderType":"Шина","price":4113,"status":"back","createdAt":"2022-04-02T00:11:47.683Z"},
// 	{"id":4,"user":{"name":"Василий","surname":"Мельник"},"orderType":"Ручка","price":3834,"status":"new","createdAt":"2022-04-02T01:16:25.845Z"},
// 	{"id":5,"user":{"name":"Сергей","surname":"Раков"},"orderType":"Шина","price":2448,"status":"back","createdAt":"2022-04-02T01:44:06.994Z"},
// 	{"id":6,"user":{"name":"Василий","surname":"Раков"},"orderType":"Шина","price":4624,"status":"archived","createdAt":"2022-04-02T05:16:01.966Z"},
// 	{"id":7,"user":{"name":"Константин","surname":"Мельник"},"orderType":"Шина","price":4413,"status":"new","createdAt":"2022-04-02T09:01:36.490Z"},
// 	{"id":8,"user":{"name":"Олег","surname":"Лепко"},"orderType":"Ноутбук","price":4883,"status":"back","createdAt":"2022-04-02T11:08:43.685Z"},
// 	{"id":9,"user":{"name":"Алексей","surname":"Раков"},"orderType":"Мыло","price":1980,"status":"back","createdAt":"2022-04-02T12:36:54.448Z"},
// 	{"id":10,"user":{"name":"Олег","surname":"Лепко"},"orderType":"Нож","price":4266,"status":"back","createdAt":"2022-04-02T13:12:17.074Z"},
// 	{"id":11,"user":{"name":"Сергей","surname":"Лепко"},"orderType":"Тетрадка","price":1800,"status":"archived","createdAt":"2022-04-02T13:14:59.030Z"},
// 	{"id":12,"user":{"name":"Алексей","surname":"Мельник"},"orderType":"Шина","price":3093,"status":"back","createdAt":"2022-04-02T15:50:45.304Z"},
// 	{"id":13,"user":{"name":"Константин","surname":"Соколов"},"orderType":"Ручка","price":1577,"status":"archived","createdAt":"2022-04-02T16:43:50.200Z"},
// 	{"id":14,"user":{"name":"Виктор","surname":"Вихта"},"orderType":"Нож","price":4079,"status":"process","createdAt":"2022-04-03T03:56:02.982Z"},
// 	{"id":15,"user":{"name":"Алексей","surname":"Лепко"},"orderType":"Ручка","price":3885,"status":"archived","createdAt":"2022-04-03T07:46:14.089Z"},
// 	{"id":16,"user":{"name":"Виктор","surname":"Лепко"},"orderType":"Шина","price":1805,"status":"process","createdAt":"2022-04-03T22:18:22.713Z"},
// 	{"id":17,"user":{"name":"Василий","surname":"Вихта"},"orderType":"Нож","price":3194,"status":"archived","createdAt":"2022-04-04T01:54:11.116Z"},
// 	{"id":18,"user":{"name":"Виктор","surname":"Соловье"},"orderType":"Ручка","price":4301,"status":"archived","createdAt":"2022-04-04T04:57:25.756Z"},
// 	{"id":19,"user":{"name":"Сергей","surname":"Соловье"},"orderType":"Мыло","price":2309,"status":"new","createdAt":"2022-04-04T06:34:07.805Z"},
// 	{"id":20,"user":{"name":"Петр","surname":"Мельник"},"orderType":"Шина","price":3193,"status":"back","createdAt":"2022-04-04T07:22:45.479Z"},
// 	{"id":21,"user":{"name":"Алексей","surname":"Соловье"},"orderType":"Шина","price":4710,"status":"new","createdAt":"2022-04-04T07:52:57.948Z"},
// 	{"id":22,"user":{"name":"Олег","surname":"Раков"},"orderType":"Кресло","price":1987,"status":"archived","createdAt":"2022-04-04T08:14:22.806Z"},
// 	{"id":23,"user":{"name":"Виктор","surname":"Саван"},"orderType":"Тетрадка","price":3664,"status":"new","createdAt":"2022-04-04T10:22:41.074Z"},
// 	{"id":24,"user":{"name":"Алексей","surname":"Лепко"},"orderType":"Шина","price":2647,"status":"archived","createdAt":"2022-04-04T14:34:57.853Z"},
// 	{"id":25,"user":{"name":"Олег","surname":"Мельник"},"orderType":"Сковородка","price":4384,"status":"archived","createdAt":"2022-04-04T17:14:04.787Z"},
// 	{"id":26,"user":{"name":"Василий","surname":"Мельник"},"orderType":"Тетрадка","price":3595,"status":"new","createdAt":"2022-04-04T20:17:36.172Z"},
// 	{"id":27,"user":{"name":"Константин","surname":"Соловье"},"orderType":"Нож","price":1714,"status":"process","createdAt":"2022-04-05T00:06:47.031Z"},
// 	{"id":28,"user":{"name":"Олег","surname":"Соколов"},"orderType":"Ноутбук","price":4253,"status":"new","createdAt":"2022-04-05T00:24:06.079Z"},
// 	{"id":29,"user":{"name":"Алексей","surname":"Саван"},"orderType":"Кресло","price":1338,"status":"new","createdAt":"2022-04-05T05:35:26.231Z"},
// 	{"id":30,"user":{"name":"Константин","surname":"Соловье"},"orderType":"Тетрадка","price":4445,"status":"back","createdAt":"2022-04-05T14:34:17.942Z"},
// 	{"id":31,"user":{"name":"Константин","surname":"Вихта"},"orderType":"Веревка","price":4268,"status":"archived","createdAt":"2022-04-05T16:44:42.691Z"},
// 	{"id":32,"user":{"name":"Константин","surname":"Соколов"},"orderType":"Тетрадка","price":1509,"status":"archived","createdAt":"2022-04-05T23:26:27.268Z"},
// 	{"id":33,"user":{"name":"Виктор","surname":"Раков"},"orderType":"Тетрадка","price":2906,"status":"back","createdAt":"2022-04-06T00:27:13.318Z"},
// 	{"id":34,"user":{"name":"Виктор","surname":"Раков"},"orderType":"Кресло","price":2888,"status":"back","createdAt":"2022-04-06T00:59:27.351Z"},
// 	{"id":35,"user":{"name":"Петр","surname":"Лепко"},"orderType":"Ноутбук","price":2651,"status":"archived","createdAt":"2022-04-06T01:18:40.540Z"},
// 	{"id":36,"user":{"name":"Олег","surname":"Мельник"},"orderType":"Мыло","price":1277,"status":"process","createdAt":"2022-04-06T04:25:48.815Z"},
// 	{"id":37,"user":{"name":"Сергей","surname":"Лепко"},"orderType":"Ручка","price":2048,"status":"new","createdAt":"2022-04-06T15:59:00.568Z"},
// 	{"id":38,"user":{"name":"Олег","surname":"Соловье"},"orderType":"Тетрадка","price":4217,"status":"new","createdAt":"2022-04-06T19:45:28.673Z"},
// 	{"id":39,"user":{"name":"Алексей","surname":"Мельник"},"orderType":"Сковородка","price":1865,"status":"new","createdAt":"2022-04-06T23:12:03.519Z"},
// 	{"id":40,"user":{"name":"Петр","surname":"Соколов"},"orderType":"Нож","price":2343,"status":"archived","createdAt":"2022-04-07T11:54:56.795Z"},
// 	{"id":41,"user":{"name":"Сергей","surname":"Мельник"},"orderType":"Сковородка","price":1452,"status":"back","createdAt":"2022-04-07T14:15:57.460Z"},
// 	{"id":42,"user":{"name":"Виктор","surname":"Вихта"},"orderType":"Ручка","price":4770,"status":"archived","createdAt":"2022-04-07T15:05:44.077Z"},
// 	{"id":43,"user":{"name":"Сергей","surname":"Мельник"},"orderType":"Веревка","price":1450,"status":"process","createdAt":"2022-04-07T15:36:24.001Z"},
// 	{"id":44,"user":{"name":"Василий","surname":"Соловье"},"orderType":"Мыло","price":1039,"status":"process","createdAt":"2022-04-07T15:53:31.752Z"},
// 	{"id":45,"user":{"name":"Константин","surname":"Раков"},"orderType":"Мыло","price":1856,"status":"process","createdAt":"2022-04-07T20:16:46.429Z"},
// 	{"id":46,"user":{"name":"Сергей","surname":"Раков"},"orderType":"Сковородка","price":2593,"status":"back","createdAt":"2022-04-07T20:55:36.888Z"},
// 	{"id":47,"user":{"name":"Константин","surname":"Раков"},"orderType":"Мыло","price":1948,"status":"new","createdAt":"2022-04-08T01:54:35.301Z"},
// 	{"id":48,"user":{"name":"Петр","surname":"Лепко"},"orderType":"Нож","price":4497,"status":"new","createdAt":"2022-04-08T07:09:54.915Z"},
// 	{"id":49,"user":{"name":"Олег","surname":"Саван"},"orderType":"Кресло","price":4804,"status":"back","createdAt":"2022-04-08T10:52:51.411Z"},
// 	{"id":50,"user":{"name":"Василий","surname":"Мельник"},"orderType":"Нож","price":3879,"status":"process","createdAt":"2022-04-08T13:14:31.976Z"}
// ];