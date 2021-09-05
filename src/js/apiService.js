const API_KEY = '23035596-1a90b7391e585725696c71550';
const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';

export default class PhotoApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;

    }

    fetchPhoto() {
        const url = `${BASE_URL}&key=${API_KEY}&q=${this.searchQuery}&per_page=12&page=${this.page}`;
        return fetch(url)
            .then(response => response.json())
            .then(({ hits }) => {
                this.page += 1;
                return hits;
            });

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