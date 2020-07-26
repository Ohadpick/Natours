export class APIParams<T> {
    page?: number;
    limit?: number;
    sort: string;
    user: string;
    model: T;
}
