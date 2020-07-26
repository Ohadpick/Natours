import { Tour } from './tour';
import { User } from './user';

export interface Review {
    _id: string;
    review: string;
    rating: number;
    createdAt: Date;
    tour: Tour;
    user: User;
}
