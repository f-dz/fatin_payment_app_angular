import { Component, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/payment/services/payment.service';

@Component({
  selector: 'app-modal-success',
  templateUrl: './modal-success.component.html',
  styleUrls: ['./modal-success.component.css']
})
export class ModalSuccessComponent implements OnInit {

  message: string = '';

  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.message = this.paymentService.message;
  }

}
