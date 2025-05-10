import { Category, Condition } from ".";

export type Product = {
    id: number;
    name: string;
    desc: string;
    images: string[];
    category: Category;
    condition: Condition;
    location: string;
    points: number;
};