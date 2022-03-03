import './cookie.html';
import './style.css';
/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#app');

const balloonContent = `<div class="review-list"></div>
<div class="form" data-role="review-form">
    <h3>Отзыв:</h3>
    <div class="field">
        <input data-role="review-name" type="text" placeholder="Укажите ваше имя">
    </div>
    <div class="field">
        <input data-role="review-place" type="text" placeholder="Укажите место">
    </div>
    <div class="field">
        <textarea data-role="review-text" placeholder="Оставьте отзыв" rows="5"></textarea>
    </div>

    <button class='button' data-role="review-add">Добавить</button>
    <span class="form-error"></span>
</div>`;

ymaps.ready(function () {
  const map = new ymaps.Map('map', {
    center: [55.76, 37.64],
    zoom: 13,
  });

  map.events.add('click', function (e) {
    if (!map.balloon.isOpen()) {
      const coords = e.get('coords');
      const promise = new Promise(function (resolve) {
        map.balloon.open(coords, {
          contentHeader: 'Событие!',
          contentBody: balloonContent,
        });
        resolve();
      });
      promise.then((result) => {
        const addButton = document.querySelector(`[data-role=review-add]`);
        addButton.addEventListener('click', (e) => {
          console.log(coords);
          map.geoObjects.add(new ymaps.Placemark(coords));
        });
      });
    } else {
      map.balloon.close();
    }
  });

  //   var placemark = new ymaps.Placemark(map.getCenter(), {

  //     balloonContentBody: balloonContent,
  //     // Зададим содержимое нижней части балуна.

  // });
  //   // Добавим метку на карту.
  //   map.geoObjects.add(placemark);
  //   // Откроем балун на метке.
  //   placemark.balloon.open();
});
