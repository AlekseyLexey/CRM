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

		console.log(this);
		this._nameInput.addEventListener('input', this.apply);
		this._typeSelect.addEventListener('select', this.apply);
		this._statusSelect.addEventListener('select', this.apply);
		this._minPriceInput.addEventListener('input', this.apply);
		this._maxPriceInput.addEventListener('input', this.apply);
		this._dateFromInput.addEventListener('input', this.apply);
		this._dateToInput.addEventListener('input', this.apply);

		
	}

	apply = () => {
		this.dispatch({
			fName: this._nameInput.value,
			fOrderType: this._typeSelect.value,
			fStatus: this._statusSelect.value,
			fMinPrice: this._minPriceInput,
			fMaxPrice: this._maxPriceInput,
			fDateFrom: this._dateFromInput,
			fDataTo: this._dateToInput
		})
	}
}

export default FilterBar;