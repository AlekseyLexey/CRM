import Observable from './Observalbe.js';

class FilterBar extends Observable {
	_nameInput = null;
	_typeSelect = null;
	_statusSelect = null;
	_minPriceInput = null;
	_maxPriceInput = null;
	_dateFromInput = null;
	_dateToInput = null;

	constructor(data) {
		super();

		this._nameInput = document.querySelector('input[data-field="name"]');
		this._typeSelect = document.querySelector('select[data-field="orderType"]');
		this._statusSelect = document.querySelector('select[data-field="orderStatus"]');
		this._minPriceInput = document.querySelector('input[data-field="minPrice"]');
		this._maxPriceInput = document.querySelector('input[data-field="maxPrice"]');
		this._dateFromInput = document.querySelector('input[data-field="dateFrom"]');
		this._dateToInput = document.querySelector('input[data-field="dateTo"]');

		this._nameInput.addEventListener('input', this.apply);
		this._typeSelect.addEventListener('select', this.apply);
		this._statusSelect.addEventListener('select', this.apply);
		this._minPriceInput.addEventListener('input', this.apply);
		this._maxPriceInput.addEventListener('input', this.apply);
		this._dateFromInput.addEventListener('input', this.apply);
		this._dateToInput.addEventListener('input', this.apply);

		if (data.orderTypes) {
			this._typeSelect.textContent = null;

			const option = document.createElement("option");
			option.value = "Все";
			option.textContent = "Все";
			this._typeSelect.append(option);

			for (const type of data.orderTypes) {
				const option = document.createElement("option");
				option.value = type;
				option.textContent = type;
				this._typeSelect.append(option);
			}
		}
	}

	apply = () => {
		this.dispatch({
			fName: this._nameInput.value,
			fOrderType: this._typeSelect.value,
			fStatus: this._statusSelect.value,
			fMinPrice: this._minPriceInput.value,
			fMaxPrice: this._maxPriceInput.value,
			fDateFrom: this._dateFromInput.value,
			fDataTo: this._dateToInput.value
		})
	}
}

export default FilterBar;