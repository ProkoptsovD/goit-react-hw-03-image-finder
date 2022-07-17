class API {
    constructor({ baseURL, authToken, params, page, perPage } = {}) {
        this.baseURL = baseURL || 'https://pixabay.com/api/';
        this.authToken = authToken || '26833467-1cbfd866f0eba1c472f46f3e4';
        this.params = params || '&image_type=photo&orientation=horizontal&per_page=12';
        this.page = page || 1;
        this.perPage = perPage || 12; 
        this.totalPages = 0;
    }

    getImage = async (query, page) => {
        try {
            const response = await fetch(this.url(query, page));
            if (response.ok) {
                const parsedData = await response.json();
                this.totalHits = await parsedData.totalHits;
                
                this.findPagesQuantaty();

                return parsedData;
            }
    
            throw new Error("404 - not found");
        } catch (error) {
            console.log(error);
        }
    };
    setBaseURL = (url) => this.baseURL = url;
    setToken = (token) => this.authToken = token;
    setParams = (params) => this.params = params;
    setPage = (pageNumber) => this.page = pageNumber;
    url = (query, page) => `${this.baseURL}?key=${this.authToken}&q=${query}&${this.params}&per_page=${this.perPage}&page=${page}`;
    nextPage = () => this.page < this.end ? this.getImage() : Promise.resolve({ hits: []});
    resetPage = () => this.page = 1;
    findPagesQuantaty = () => {
        this.totalPages = Math.ceil(+this.totalHits / this.perPage);
    };
}

export const pixabayAPI = new API();