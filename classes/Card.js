export default class Card {
  constructor({ brand, model, img, price, description, color, year, topSpeed, weight, drive}) {
    const containerElement = document.createElement('div');
    containerElement.classList.add('component-card');

    containerElement.innerHTML = `
      <div class="component-card-img" style="background-image: url('img/${img}')"></div>
      <div class="component-card-brand">${brand}</div>
      <div class="component-card-model">${model}</div>
      <div class="component-card-price">${price}</div>
      <div class="component-card-descr">${description}</div>
      <button href="#car" class="component-card-more">Learn more..</button>
    `;
    
    containerElement.querySelector('button').addEventListener('click', () => {
      const a = document.createElement('a');
      a.href = '#car';
      a.click();
      const container = document.querySelector('.component-page');
      container.innerHTML = `
        <div class="component-page-img">
        <img src="img/big/${img}">
        </div>
        <div class="component-page-info">
        <div class="component-page-title">${brand + ' ' + model}</div>
        <div class="component-page-price">${price}</div>
        <div class="component-page-descr">${description}</div>
        <table class="component-page-table">
          <tr>
            <td>Максимальная скорость</td>
            <td>${topSpeed}км/ч</td>
          </tr>
          <tr>
            <td>Вес</td>
            <td>${weight}кг</td>
          </tr>
          <tr>
            <td>Привод</td>
            <td>${drive}</td>
          </tr>
          <tr>
            <td>Цвет</td>
            <td>${color}</td>
          </tr>
          <tr>
            <td>Модельный год</td>
            <td>${year}</td>
          </tr>
        </table>
        </div>
      `;
    });

    return containerElement;
  }
  static appendCards(container, cars, onClick) {
    cars.forEach((car) => {
      container.append(new Card(car, onClick));
    });
  }
}