import EventEmitter from "./EventEmitter.js";

class Paginator extends EventEmitter {
	_root = null;
	_pages = 1;
	_page = 1;

	constructor(root, pages, page) {
		super();

		this._root = root;
		this._pages = pages;
		this._page = page;

		this.update();
	}

	get pages() {
		return this._pages;
	}

	set pages(pages) {
		this._pages = pages;
		this.update();
	}

	get page() {
		return this._page;
	}

	set page(page) {
		this._page = page;
		this.update();
	}

	update() {
		this._root.textContent = '';

		const nav = document.createElement('nav');
		this._root.append(nav);

		const ul = document.createElement('ul');
		ul.classList.add('pagination', 'justify-content-center');
		nav.append(ul);

		const back = document.createElement('li');
		back.classList.add('page-item');

		const backlink = document.createElement('a');
		backlink.classList.add('page-link');
		backlink.href = '#';
		backlink.textContent = 'Назад';

		back.append(backlink);
		ul.append(back);

		backlink.addEventListener('click', (e) => {
			e.preventDefault();
			this.emit('move', this._page - 1);
		});

		if (this._page === 1) {
			back.classList.add("disabled");
		}

		for (let i = 1; i <= this._pages; i++) {
			const li = document.createElement('li');
			li.classList.add('page-item');

			const a = document.createElement('a');
			a.classList.add('page-link');
			a.href = '#';
			a.textContent = i;

			li.append(a);
			ul.append(li);

			a.addEventListener('click', e => {
				e.preventDefault();
				this.emit('move', i);
			});

			if (i === this._page) {
				li.classList.add('active');
			}
		}

		const next = document.createElement('li');
		next.classList.add('page-item');

		const nextA = document.createElement('a');
		nextA.classList.add('page-link');
		nextA.href = '#';
		nextA.textContent = 'Вперед';

		next.append(nextA);
		ul.append(next);

		nextA.addEventListener('click', e => {
			e.preventDefault();
			this.emit('move', this._page + 1);
		});

		if (this._page === this._pages) {
			next.classList.add('disabled');
		}
	}
}

export default Paginator;