// Authentication types
export type LoginCredentials = {
    email: string;
    password: string;
};

export type SignUpCredentials = {
    email: string;
    phoneNumber: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    role: string;
    location: string;
}

