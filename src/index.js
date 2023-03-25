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
