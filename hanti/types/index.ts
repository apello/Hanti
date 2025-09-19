// Seller User Info type
export type UserInfo = {
    sellerEmail: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
};

// Seller Home Info type
export type YesNo = "yes" | "no" | string;

export type HomeInfo = {
    homeAddress: string;
    agentDetails: number;
    timeline: string; 
    squareFootage: number;
    yearBuilt: number;
    bedrooms: number;
    fullBathrooms: number;
    threeFourthBathrooms: number;
    oneHalfBathrooms: number;
    floors: number;
    hasPool: YesNo;
    parkingSpaces: number;
    gatedCommunity: YesNo;
    hasBasement: YesNo;
    poolType: "above ground" | "in ground" | string;
    basementSquareFootage?: number; // optional since it might be empty
};
