import { Geometry } from './geometry';
import { User } from './user';
import { Review } from './review';

export interface Tour {
    _id: string;
    name: string;
    slug: string;
    duration: number;
    maxGroupSize: number;
    difficulty: ['easy', 'medium', 'difficult'];
    ratingsAverage: number;
    ratingsQuantity: number;
    price: number;
    priceDiscount: number;
    summary: string;
    description: string;
    imageCover: string;
    images: string[];
    createdAt: Date;
    startDates: Date[];
    secretTour: boolean;
    startLocation: Geometry;
    locations: Geometry[];
    guides: User[];
    reviews: Review[];
}
