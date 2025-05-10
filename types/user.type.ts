export type User = {
    id: number;
    name: string;
    email: string;
    location: string;
    joinedAt: Date;
    userType: UserTrade;
    phone: string;
};

type UserTrade = "doador" | "receptor" | "ambos";