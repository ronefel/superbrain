class StorageUtils {

    constructor() {

        this._allowMultipleRequests = false;
        this._requestsCounter = 0;
    }

    // --------------------------------------------------------------------
    set allowMultipleRequests(allowMultipleRequests) {
        this._allowMultipleRequests = allowMultipleRequests;
    }

    // --------------------------------------------------------------------
    async save(key, data) {

        // check if any load/save request is still running
        if (!this._allowMultipleRequests && this._requestsCounter > 0) {
            throw new Error("Previous load/save request was not finished yet");
        }
        ++this._requestsCounter;

        // standard storage
        let storage = this.getLocalStorage();

        if (storage !== null) {
            let dataString = JSON.stringify(data);

            console.log(`saving key ${key}: ${dataString}`);

            storage.setItem(key, dataString);

        } else {
            --this._requestsCounter;
            throw new Error("Standard storage not available");
        }

        --this._requestsCounter;
    }

    // --------------------------------------------------------------------
    async load(key) {

        // check if any load/save request is still running
        if (!this._allowMultipleRequests && this._requestsCounter > 0) {
            throw new Error("Previous load/save request was not finished yet");
        }
        ++this._requestsCounter;

        let data = null;

        // standard storage
        let storage = this.getLocalStorage();

        if (storage !== null) {
            let dataString = storage.getItem(key);

            console.log(`loading key ${key}: ${dataString}`);

            data = JSON.parse(dataString);

        } else {
            --this._requestsCounter;
            throw new Error("Standard storage not available");
        }

        --this._requestsCounter;

        return data;
    }

    // --------------------------------------------------------------------
    getLocalStorage() {
        try {
            if ("localStorage" in window && window["localStorage"] != null) {
                return localStorage;
            }
        } catch (e) {
            return null;
        }

        return null;
    }
}

export default new StorageUtils();
