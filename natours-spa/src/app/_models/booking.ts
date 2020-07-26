import { Tour } from './tour';
import { User } from './user';

export interface Booking {
    _id: string;
    price: number;
    createdAt: Date;
    paid: boolean;
    tour: Tour;
    user: User;
}
