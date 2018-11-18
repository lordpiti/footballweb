export interface Feed {
    url: string;
    title: string;
    link: string;
    author: string;
    description: string;
    image: string;
}

export interface Enclosure {
    link: string;
    type: string;
    thumbnail: string;
}

export interface Item {
    title: string;
    pubDate: string;
    link: string;
    guid: string;
    author: string;
    thumbnail: string;
    description: string;
    content: string;
    enclosure: Enclosure;
    categories: string[];
}

export interface RSSResponse {
    status: string;
    feed: Feed;
    items: Item[];
}
