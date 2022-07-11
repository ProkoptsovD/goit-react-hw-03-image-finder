class API {
    constructor({ baseURL, authToken, params, page, perPage } = {}) {
        this.baseURL = baseURL || 'https://pixabay.com/api/';
        this.authToken = authToken || '26833467-1cbfd866f0eba1c472f46f3e4';
        this.params = params || '&image_type=photo&orientation=horizontal&per_page=12';
        this.page = page || 1;
        this.perPage = perPage || 12; 
        this.end = 0;
        this.isTouched = false;
        this.query = '';
    }

    getImage = async (query) => {
        try {
            this.handleQuery(query);
            const response = await fetch(this.url());
            if (response.ok) {
                const parsedData = await response.json();
                
                if (!this.isTouched) this.findEnd(parsedData.totalHits);
                this.page += 1;

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
    url = () => `${this.baseURL}?key=${this.authToken}&q=${this.query}&${this.params}&per_page=${this.perPage}&page=${this.page}`;
    nextPage = () => this.page < this.end ? this.getImage() : Promise.resolve({ hits: []});
    resetPage = () => this.page = 1;
    findEnd = (totalHits) => {
        this.end = Math.ceil(+totalHits / this.perPage);
        this.isTouched = true;
    };
    handleQuery = (query) => {
        if (!query) return;
        
        if(this.query && this.query !== query) {
            this.resetPage();
        }

        this.query = query;
    }
}

export const pixabayAPI = new API();