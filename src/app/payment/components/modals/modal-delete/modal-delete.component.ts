import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { PaymentService } from 'src/app/payment/services/payment.service';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent implements OnInit, OnDestroy {

  @Output() eventDelete = new EventEmitter();
  @Output() isDeleteSuccess = new EventEmitter();
  @Input() idToDelete: number = 0;

  message: string = '';
  modalDelete: boolean = true;
  loader: boolean = false;

  constructor(private paymentService: PaymentService) { }

  deletePayment() {
    this.loader = true;
    this.paymentService.deletePaymentDetails(this.idToDelete).subscribe(res => {
      this.loader = false;
      this.isDeleteSuccess.emit();
      this.message = 'Delete';
      this.ngOnDestroy();
    });
  }

  closeModal() {
    this.modalDelete = false;
    this.eventDelete.emit();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.paymentService.message = this.message;
  }

}
