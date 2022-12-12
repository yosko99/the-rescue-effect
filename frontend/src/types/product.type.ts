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
    image: string;
    rating: {
        rate: Number;
        count: Number;
    };
    translations: [ProductTranslationsType];
}

export interface CreateProductType {
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}
