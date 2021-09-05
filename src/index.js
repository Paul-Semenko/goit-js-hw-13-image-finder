import "./sass/main.scss";
import { alert, notice, info, success, error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import PhotoApiService from './js/apiService.js';
import photoCardTpl from './templates/photoCard.hbs';
import { refs } from './js/refs.js';
import * as basicLightbox from 'basiclightbox';

const photoApiService = new PhotoApiService();

refs.formElem.addEventListener('submit', onSearch);
refs.buttonLoadMore.addEventListener('click', onLoadMore)

function onSearch(e) {
    e.preventDefault();

    photoApiService.query = e.currentTarget.elements.query.value
    if (photoApiService.query === '') {
        return alert({ text: 'There are nothing in the input! Try to type something' });
    }

    photoApiService.fetchPhoto().then(hits => {
        const match = hits.length;
        if (match === 0) {
            error({ text: 'Incorrect request!' });
            hideLoadMoreBtn();
        }

    });
    photoApiService.fetchPhoto().then(appendHitsMarkup)
    clearHitsList();
    showLoadMoreBtn();
    photoApiService.resetPage();

}

function onLoadMore() {
    photoApiService.fetchPhoto()
        .then(appendHitsMarkup)


}

function appendHitsMarkup(hits) {
    refs.galleryList.insertAdjacentHTML('beforeend', photoCardTpl(hits));
    handleButtonClick();

}

function clearHitsList() {
    refs.galleryList.innerHTML = '';
}

function showLoadMoreBtn() {
    refs.buttonLoadMore.classList.remove('is-hidden');
}

function hideLoadMoreBtn() {
    refs.buttonLoadMore.classList.add('is-hidden');
}



function handleButtonClick() {
    const element = document.querySelector('.scroll');
    element.scrollIntoView({ block: "end", behavior: "smooth" });

}

refs.buttonLoadMore.addEventListener('click', handleButtonClick);
refs.galleryList.addEventListener('click', onOpenModal);

function onOpenModal(e) {
    if (e.target.nodeName !== "IMG") {
        return
    }
    const instance = basicLightbox.create(`
<img src="${e.target.dataset.src}" width="800" height="600">`)
    instance.show();
}