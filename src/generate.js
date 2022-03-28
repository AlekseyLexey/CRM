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

const generate = (n) => 
	Array(n)
	.fill()
	.map(generateOrder)
	.sort((a, b) => a.createdAt - b.createdAt)
	.map((order, i) => ({
		id: ++i,
		...order,
	}));

console.log(generate(5));