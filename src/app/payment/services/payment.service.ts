import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { errorHandler } from 'src/app/helper/helpers/errorHandler';
import { PaymentDetails } from '../models/PaymentDetails';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  endpoint: string = `https://fatin-payment-app.herokuapp.com/api/payment`;
  
  constructor(private http: HttpClient) { }

  public message: string = '';

  getPaymentDetails (): Observable<any> {
    return (
      this.http
      .get(this.endpoint)
      .pipe(catchError(errorHandler))
    );
  }

  getOnePaymentDetails (id: number): Observable<any> {
    return (
      this.http
      .get(this.endpoint, { params: { id } })
      .pipe(catchError(errorHandler))
    );
  }

  addPaymentDetails(paymentDetails: PaymentDetails): Observable<any> {
    return this.http
      .post(this.endpoint, paymentDetails)
      .pipe(catchError(errorHandler)
    );
  }

  updatePaymentDetails(paymentDetails: PaymentDetails): Observable<any> {
    const { paymentDetailId } = paymentDetails;
    return (
      this.http
      .put(`${this.endpoint}/${paymentDetailId}`, paymentDetails)
      .pipe(catchError(errorHandler))
    );
  }

  deletePaymentDetails(id: number): Observable<any> {
    return (this.http
      .delete(`${this.endpoint}/${id}`)
      .pipe(catchError(errorHandler))
    );
  }
}
