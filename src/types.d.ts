declare type CurrencyRate = {
    country: string;
    currency: string; 
    amount: number;
    code: string;
    rate: number;
}

declare type ApiResponse<T> = {
    success: false;
} | {
    success: true;
    data: T;
}