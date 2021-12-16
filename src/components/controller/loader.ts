import { IDataSources } from '../view/sources/sources';

export type Callback<T> = (data: T) => void;

const enum StatusCode {
    errorUnauthorized = 401,
    errorNotFound = 404,
}

class Loader {
    constructor(private baseLink: string, private options: { [key: string]: string }) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp({ endpoint, options = {} }: { endpoint: string; options?: object }, callback: Callback<IDataSources>) {
        this.load('GET', endpoint, callback, options);
    }

    errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === StatusCode.errorUnauthorized || res.status === StatusCode.errorNotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }
        return res;
    }

    makeUrl(options: object, endpoint: string) {
        const urlOptions: object = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;
        (Object.keys(urlOptions) as Array<keyof typeof urlOptions>).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });
        return url.slice(0, -1);
    }

    load(method: string, endpoint: string, callback: Callback<IDataSources>, options: Object = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data: IDataSources) => callback(data))
            .catch((err: Error) => console.error(err));
    }
}

export default Loader;
