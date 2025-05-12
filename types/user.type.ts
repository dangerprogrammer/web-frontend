import { Product } from ".";

export type User = {
    id: number;
    name: string;
    email: string;
    location: string;
    joinedAt: Date;
    userType: UserTrade;
    phone: string;
    totalPoints: number;
    ownerProducts: Product[];
    interestedProducts: Product[];
};

type UserTrade = "doador" | "receptor" | "ambos";