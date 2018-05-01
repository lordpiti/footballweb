export interface DetailsMenuData {
    itemsList: DetailsMenuItem[];
    imageUrl: string;
    title: string;
    dataLoaded: boolean;
    entityName: string;
}

export interface DetailsMenuItem {
    link: string;
    title: string;
}
