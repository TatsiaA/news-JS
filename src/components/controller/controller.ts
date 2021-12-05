import AppLoader from './appLoader';

interface ChangeInterface {
    target: HTMLElement;
    currentTarget: HTMLElement;
}
class AppController extends AppLoader {
    getSources(callback: () => void) {
        super.getResp(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews(e: ChangeInterface, callback: () => void) {
        let target: HTMLElement = e.target;
        const newsContainer = e.currentTarget;

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