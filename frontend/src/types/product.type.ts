interface ProductTranslationsType {
    lang: string;
    title: string;
    description: string;
}

export interface ProductType {
    id: Number;
    title: string;
    price: Number;
    description: string;
    category: string;
    rating: {
        rate: Number;
        count: Number;
    };
    translations: [ProductTranslationsType];
}
