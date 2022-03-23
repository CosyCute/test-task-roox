export interface IAddress {
    city: string;
}

export interface ICompany {
    name: string;
}

export interface IUser {
    id: number;
    name: string;
    address: IAddress;
    company: ICompany;
}

export interface IAddressProfile extends IAddress{
    street: string;
    zipcode: number;
} 

export interface IUserProfile extends IUser{
    id: number;
    username: string;
    email: string;
    address: IAddressProfile;
    phone: string;
    website: string;
}