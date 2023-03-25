import './css/styles.css';
import axios from 'axios';
import axios from 'axios';
import Notiflix from 'notiflix';
import Notiflix from 'notiflix';

// отримуємо доступ до елем зі сторінки
const refs = {
  formEl: document.querySelector('.search-form'),
  inputEl: document.querySelector('input'),
  gallery: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('.load-more'),
};
// console.log(refs.btnLoadMore);
// змінна пейдж =1

let page = 1;

// слухачі подій для сабміту форми і кнопки завантаж більше
refs.formEl.addEventListener('submit', onSearchForm);
refs.btnLoadMore.addEventListener('click', onClickBtnLoadMore);
// ховаємо кнопку завантаж більше
refs.btnLoadMore.style.display = 'none';

// функція обробляє подію на submit
function onSearchForm(e) {
  // скасовуємо завантаження за замовчуванням
  e.preventDefault();
  page = 1;
  // очищуємо вміст галереї
  refs.gallery.innerHTML = '';

  // змінна для пошукового запиту, обрізаємо пробіли до і після
  const searchQuery = refs.inputEl.value.trim();
  //   console.log(searchQuery);

  // створюємо умову, якщо пошукова строка не пуста то отримати зображення
  if (searchQuery !== '') {
    pixabay(searchQuery);
  } else {
    // в іншому випадку виводим повідомлення , що немає зображень за даним запитом
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}

// функція обробляє клік на завантаж більше
function onClickBtnLoadMore() {
  page += 1;
  pixabay(searchQuery, page);
}

//функція для http-запитів з pixabay
async function pixabay(name, page) {
  const BASE_URL = 'https://pixabay.com/api/';
  const API_KEY = '34723725-685e16b0a798f5e2d487ad425';

  // параметри запиту для pixabay
  const options = {
    params: {
      key: API_KEY,
      q: name,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: page,
      per_page: 40,
    },
  };

  //отримуємо результат від бекенд
  try {
    const response = await axios.get(BASE_URL, options);
    const length = response.data.hits.length;
    const totalHits = response.data.total;

    notificationMsg(length, totalHits);

    createMarkup(response.data.hits);
  } catch (error) {
    console.log(error);
  }
}

// функція додає розмітку на сторінку
function createMarkup(stock) {
  const markup = stock
    .map(
      item => `
        <div class="photo-card">
  <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
      ${item.likes}
    </p>
    <p class="info-item">
      <b>Views</b>
      ${item.views}
    </p>
    <p class="info-item">
      <b>Comments</b>
      ${item.comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>
      ${item.downloads}
    </p>
  </div>
</div>`
    )
    .join('');

  // додаємо розмітку на сторінку
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

// функція для сповіщень
function notificationMsg(length, totalHits) {
  // якщо зображень не знайдено -вивести повідомлення , що немає спробуйте ще
  if (length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  if (page === 1) {
    //   показуємо кнопку завантажити ще
    refs.btnLoadMore.style.display = 'flex';
    //   сповіщення про успішну операцію
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  }
  // якщо прийшло менеше 40 зображ, значить вони скінчились, ховаємо кнопку і виводимо повідомлення
  if (length < 40) {
    refs.btnLoadMore.style.display = 'none';
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
}
