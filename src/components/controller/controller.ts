//import { IDataNews } from '../view/news/news';
import { IDataSources } from '../view/sources/sources';
import AppLoader from './appLoader';
import { Callback } from './loader';

// interface IChangeInterface extends MouseEvent {
//     target: HTMLElement;
//     currentTarget: HTMLElement;
// }
class AppController extends AppLoader {
    getSources(callback: Callback<IDataSources>) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: MouseEvent, callback: Callback<IDataSources>) {
        let target: HTMLElement = <HTMLElement> e.target;
        const newsContainer: HTMLElement = <HTMLElement> e.currentTarget;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = <string> target.getAttribute('data-source-id');
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = <HTMLElement> target.parentNode;
        }
    }
}

export default AppController;
