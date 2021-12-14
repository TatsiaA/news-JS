import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: 'a7af1bca4cc5432986f3bc8001dcc49e',
        });
    }
}

export default AppLoader;
