export interface PaymentDetails {
    paymentDetailId?: number,
    cardOwnerName: string,
    cardNumber: string,
    expirationDate: string,
    securityCode: string
}