const API_KEY = '23035596-1a90b7391e585725696c71550';
const BASE_URL = 'https://pixabay.com/api';

export default class PhotoApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchPhoto() {
        const url = `${BASE_URL}?key=${API_KEY}&image_type=photo&orientation=horizontal&q=${this.searchQuery}&per_page=12&page=${this.page}`;
        try {
            const response = await fetch(url);
            const { hits } = await response.json();
            this.page += 1;
            return hits;
        } catch (error) {
            return console.log(error);
        }
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }

}