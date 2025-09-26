// ========== USERS ==========

export interface User {
  userId: number;       // PK
  email: string;        // unique
  phoneNumber?: string; // QUESTION MARK MEANS NOT REQUIRED
  passwordHash: string; // store hashed password
  firstName: string;
  lastName: string;
  role: "buyer" | "seller" | "agent";
  location: string;
}

export interface PropertyListing {
  listingId: number;    // PK
  ownerId: number;      // FK → User.userId
  agentId?: number;     // FK → User.userId (role = "agent")
  address: string;
  timeline: string;     // e.g. "ASAP", "3-6 months"
  squareFootage: number;
  yearBuilt: number;
  bedrooms: number;
  bathrooms: {
    full: number;
    threeQuarter: number;
    half: number;
  };
  floors: number;

  hasPool: boolean;
  poolType?: string;
  parkingSpaces: number;
  isGatedCommunity: boolean;
  hasBasement: boolean;
  basementSquareFootage?: number;

  askingPrice: number;
}

export interface RentalUnit {
  rentalId: number;     // PK
  ownerId: number;      // FK → User.userId
  agentId?: number;     // FK → User.userId (role = "agent")

  address: string;
  unitNumber?: string;  // for apartments/condos in buildings

  monthlyRent: number;
  securityDeposit?: number;
  leaseLength: "month-to-month" | "6 months" | "12 months" | "24 months";
  availableFrom: Date;

  squareFootage: number;
  bedrooms: number;
  bathrooms: {
    full: number;
    half: number;
  };

  // Apartment/community amenities
  amenities: {
    inUnitLaundry: boolean;
    parking: "none" | "street" | "garage" | "lot";
    gym: boolean;
    pool: boolean;
    petFriendly: boolean;
    furnished: boolean;
    balcony?: boolean;
    storageUnit?: boolean;
    airConditioning?: boolean;
    heating?: boolean;
  };

  isGatedCommunity: boolean;
  buildingYear: number;
  floorsInUnit: number; // for duplex/triplex rentals
}

export interface Agent { // WILL BE FOR FUTURE USE
  agentId: number;        // PK
  userId: number;         // FK → User.userId (if agents also log into your platform)
  photo: string;

  // Professional details RESEARCH THESE
  estateBoardId: string;  // EARB registration/licensing number
  licenseExpiry: Date;    // license validity
  agencyName?: string;    // agency/company they represent
  yearsOfExperience?: number;

  // Contact details
  phoneNumber: string;
  email: string;
  officeAddress?: string; // physical office location

  // Verification / compliance
  nationalId?: string;    // Kenya National ID (for KYC purposes)
  kraPin?: string;        // Kenya Revenue Authority PIN (optional if needed for compliance)
  isVerified: boolean;    // whether admin has verified their credentials
}

export interface AgentReview {
  reviewId: number;    // PK
  agentId: number;     // FK → Agent.agentId
  reviewerId: number;  // FK → User.userId (the person writing the review)

  rating: number;      // 1–5 stars
  comment?: string;    // optional text feedback
  createdAt: Date;     // timestamp
}

export interface RentalReview {
  reviewId: number;      // PK
  rentalId: number;      // FK → RentalUnit.rentalId
  reviewerId: number;    // FK → User.userId

  rating: number;        // 1–5 stars
  comment?: string;
  createdAt: Date;
}
