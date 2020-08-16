import IAddress from './address.interface';
import ICompany from './company.interface';

export default interface IUser{
    id: number,
    name: string,
    username: string,
    email: string,
    phone: string,
    website: string,
    company: ICompany,
    address: IAddress,
    complatedTaskCount?: number
}