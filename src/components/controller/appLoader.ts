import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: 'a7af1bca4cc5432986f3bc8001dcc49e', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;