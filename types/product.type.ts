import { Category, Condition } from ".";

export type Product = {
    id: number;
    name: string;
    desc: string;
    image: string;
    categories: Category[];
    condition: Condition;
    location: string;
    requiredPoints: number;
};