import Dropdown from "./classes/Dropdown.js";
import Card from "./classes/Card.js";
import Router from "./classes/Router.js";
import BigCard from "./classes/BigCard.js";

  createList(values, defaultValue, initialState) {
    const div = document.createElement('div');
    const ul = document.createElement('ul');
    const divHeading = document.createElement('div');
    div.className = `component-dropdown-container ${initialState ? 'disabled' : ''}`;
    divHeading.className = `component-dropdown-value`;
    divHeading.textContent = defaultValue;
    div.append(divHeading);
    ul.className = `component-dropdown-list`;
    div.append(ul);
    this.populateList.call(div, values);
    document.querySelector('.filters').append(div);
    return div;
  }

  set setSelectedValue(value) {
    this._selectedValue = value;
    this.element.querySelector('.component-dropdown-value').textContent = value;
  }

// Фильтры
const modelDropdown = new Dropdown("Выберите модель", []);
const brandDropdown = new Dropdown("Выберите марку", [], (brand) => {
  modelDropdown.setItemsList([]);
  modelDropdown.clearSelectedValue();
  if (brand) {
    getModels(brand).then((models) => {
      modelDropdown.setItemsList(models);
    });
  }
});

getBrands().then((brands) => {
  brandDropdown.listItems = [];
  brandDropdown.setItemsList(brands);
  brands.forEach((elem) => { brandDropdown.listItems.push(elem) });
});

filtersContainer.append(brandDropdown.element);
filtersContainer.append(modelDropdown.element);

  clear() {
    this.element.querySelector('.component-dropdown-value').textContent = this.defaultValue;
    this._selectedValue = '';
    let button = this._slave;
    while (button.name !== 'button') {
      button = button._slave;
    }
    button.element.classList.add('disabled');
  }

  populateList(values) {
    const ul = this.querySelector('ul');
    ul.innerHTML = '';
    values.forEach((e) => {
      const li = document.createElement('li');
      li.className = `component-dropdown-item`;
      li.textContent = e;
      ul.append(li);
    });
  }
}

function getBrands() {
  return fetch("https://cars-server.herokuapp.com/brands").then((response) => {
    return response.json();
  });
}

function getModels(brand) {
  return fetch(`https://cars-server.herokuapp.com/models/${brand}`).then((response) => {
    return response.json();
  });
}

function getCar(id) {
  // Получить авто по id
  return fetch(`https://cars-server.herokuapp.com/cars/${id}`).then(
    (response) => {
      return response.json();
    }
  );
}

fetch('server-responce.txt')
  .then(response => response.text())
  .then(data => { cars = JSON.parse(data); })
  .then(() => {
    const filters = document.querySelector('.filters');
    const brandDropdown = new Dropdown('Choose brand', (() => {
      return Array.from(new Set(cars.map((e) => e.brand)));
    })(), 'brand');

    /*const*/ modelDropdown = new Dropdown('Choose model', [], 'model', [brandDropdown, null], true);
    const filterButton = {
      name: 'button',
      element: document.createElement('button'),
      _master: modelDropdown,
    };
    filterButton.element.className = 'component-search disabled';
    filterButton.element.innerText = 'Choose';
    filters.append(filterButton.element);
    filterButton.element.addEventListener('click', function () {
      if (!this.classList.contains('disabled')) {
        let top = filterButton;
        let filteredCars = cars;
        while (top._master !== null) {
          top = top._master;
          filteredCars = filteredCars.filter(e => e[top.name] === top.value);
          
        }
        cardsContainer.innerHTML = '';
        filteredCars.forEach(car => cardsContainer.append(new Card(car)));
      }
    });
    modelDropdown._slave =  filterButton;
    const cardsContainer = document.querySelector('.cards-container');
    cars.forEach(car => cardsContainer.append(new Card(car)));
  });