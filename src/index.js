import "./sass/main.scss";
import PhotoApiService from './js/apiService.js';
import photoCardTpl from './templates/photoCard.hbs';
import { refs } from './js/refs.js';
import * as basicLightbox from 'basiclightbox';

const photoApiService = new PhotoApiService();

refs.formElem.addEventListener('submit', onSearch);
refs.buttonLoadMore.addEventListener('click', onLoadMore)

function onSearch(e) {
    e.preventDefault();

    clearHitsList();
    photoApiService.query = e.currentTarget.elements.query.value;
    showLoadMoreBtn();
    photoApiService.resetPage();
    photoApiService.fetchPhoto()
        .then(appendHitsMarkup)
    handleButtonClick();

}

function onLoadMore() {
    photoApiService.fetchPhoto()
        .then(appendHitsMarkup)

}

function appendHitsMarkup(hits) {
    refs.galleryList.insertAdjacentHTML('beforeend', photoCardTpl(hits));


}

function clearHitsList() {
    refs.galleryList.innerHTML = '';
}

function showLoadMoreBtn() {
    refs.buttonLoadMore.classList.remove('is-hidden');
}

const element = document.querySelector('#js-gallery');

function handleButtonClick() {
    element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: "nearest", });

}

refs.buttonLoadMore.addEventListener('click', handleButtonClick);
refs.galleryList.addEventListener('click', onOpenModal);

function onOpenModal(e) {
    if (e.target.nodeName !== "IMG") {
        return
    }
    const instance = basicLightbox.create(`
<img src="${e.target.dataset.src}" width="800" height="600">
`)

    instance.show();

}