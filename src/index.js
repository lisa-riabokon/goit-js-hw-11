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

// слухачі подій для сабміту форми і кнопки завантаж більше
refs.formEl.addEventListener('submit', onSearchForm);
refs.btnLoadMore.addEventListener('click', onClickBtnLoadMore);
// ховаємо кнопку завантаж більше
refs.btnLoadMore.style.display = 'none';

// функція обробляє подію на submit
function onSearchForm(e) {
  // скасовуємо завантаження за замовчуванням
  e.preventDefault();

  // змінна пейдж =1
  let page = 1;
  // очищуємо вміст галереї
  refs.gallery.innerHTML = '';

  // змінна для пошукового запиту, обрізаємо пробіли до і після
  const searchQuery = refs.inputEl.value.trim();
  //   console.log(searchQuery);
}

// функція обробляє клік на завантаж більше
function onClickBtnLoadMore() {}
