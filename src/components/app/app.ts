import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { IDataSources } from '../view/sources/sources';

class App {
    controller: AppController;
    view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }
    
    // writeNews (data: ) {
    //     this.view.drawNews(data)
    // }

    start(): void {
        (document
            .querySelector('.sources') as HTMLDivElement)
            .addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data)));
        this.controller.getSources(((data) => this.view.drawSources(data)));
    }
}

export default App;
