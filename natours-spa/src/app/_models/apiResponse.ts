export interface Doc<T> {
    data: T;
}

export class APIResponse<T> {
    status: string;
    results: number;
    data: Doc<T>;
}
