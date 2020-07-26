export class Session {
    id: number;
}

export interface CheckoutSession {
    status: string;
    session: Session;
}
