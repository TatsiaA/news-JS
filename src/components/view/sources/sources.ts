import './sources.css';

export interface IDataSources {
    status: string;
    sources?: Array<Source>;
    totalResults?: number;
    articles?: Array<Text>;
}

export type Source = {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
};

export type Text = {
    source: {
        id?: string;
        name: string;
    };
    author?: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content?: string;
};

class Sources {
    draw(data: Array<Source>) {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            (sourceClone.querySelector('.source__item-name') as HTMLSpanElement).textContent = item.name;
            (sourceClone.querySelector('.source__item') as HTMLDivElement).setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        (document.querySelector('.sources') as HTMLDivElement).append(fragment);
    }
}

export default Sources;
