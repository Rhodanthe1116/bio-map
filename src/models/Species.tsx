export interface Species {
    id: number;
    lat: number;
    lng: number;
    englishName: string;
    scientificName: string;
    growthFrom: string;
    season: string;
    isCommon: boolean;
    name: string;
    form: Form;
    stem: Stem;
    leaf: Leaf;
    flower: Flower;
    fruit: Fruit;
    usage: string;
    adversity: string;
    socialMeaning: string;
    others: string;
}
interface Form {
    description: string;
    note: string;

}
interface Stem {
    description: string;
    note: string;

}
interface Leaf {
    description: string;
    note: string;

}
interface Flower {
    description: string;
    note: string;
    startMonth: number;
    endMonth: number;
}

interface Fruit {
    description: string;
    startMonth: number;
    note: string;
    endMonth: number;    
}