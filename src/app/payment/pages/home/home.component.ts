import { formatDate } from '@angular/common';
import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentDetails } from '../../models/PaymentDetails';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy {

  message: string = '';
  titleForm: string = 'Add New Payment Details';
  titleButton: string = 'ADD';
  formUpdate: boolean = false;

  idToDelete: number = 0;
  modalDelete: boolean = false;
  modalSuccess: boolean = false;
  loader: boolean = false;

  listPaymentDetails: Array<PaymentDetails> = [];

  isSubmitted: boolean = false;
  date: string = formatDate(new Date(), 'yyyy-MM-dd', 'en');

  constructor (
    private paymentService: PaymentService,
  ) { }

  form = {
    inputData: new FormGroup ({
      paymentDetailId: new FormControl(''),
      cardOwnerName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      cardNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{16}')
      ]),
      expirationDate : new FormControl('', Validators.required),
      securityCode: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(4),
        Validators.pattern('^[0-9]+$')
      ])
    })
  }

  get paymentDetailId() {return this.form.inputData.get('paymentDetailId')}
  get cardOwnerName() {return this.form.inputData.get('cardOwnerName')}
  get cardNumber() {return this.form.inputData.get('cardNumber')}
  get expirationDate() {return this.form.inputData.get('expirationDate')}
  get securityCode() {return this.form.inputData.get('securityCode')}

  getListPaymentDetails() {
    this.loader = true;
    this.paymentService.getPaymentDetails()
      .subscribe(payments => {
        this.listPaymentDetails = payments;
        this.loader = false;
      }
    );
  }

  submitForm() {
    this.isSubmitted = true;
    if (this.formUpdate == true) {
      this.handleUpdateForm();
    } else {
      this.handleAddForm();
    }
  }

  handleAddForm = () => {  
    if (this.validateForm() == true) this.addPayment();
  }

  handleUpdateForm = () => {
    if (this.validateForm() == true) this.updatePayment();
  }

  validateForm = () => {
    if (this.form.inputData.valid) {
      this.date = formatDate(this.date, 'yyyy-MM-dd', 'en');
      if(this.expirationDate?.value >= this.date) {
        return true;
      } else return false;
    } else return false;
  }

  showAddNew() {
    this.isSubmitted = false;
    this.formUpdate = false;
    this.titleForm = 'Add New Payment Details';
    this.titleButton = 'ADD';
    this.form.inputData.reset();
  }

  showUpdateData(payment: PaymentDetails) {
    this.titleForm = 'Update Payment Details';
    this.titleButton = 'UPDATE';
    this.isSubmitted = false;
    this.formUpdate = true;
    this.paymentDetailId?.setValue(payment.paymentDetailId);
    this.cardOwnerName?.setValue(payment.cardOwnerName);
    this.cardNumber?.setValue(payment.cardNumber);
    this.expirationDate?.setValue(payment.expirationDate);
    this.securityCode?.setValue(payment.securityCode);
  }

  reloadForm() {
    this.cardOwnerName?.setValue('');
    this.cardNumber?.setValue('');
    this.expirationDate?.setValue('');
    this.securityCode?.setValue('');
  }

  addPayment() {
    const paymentData = this.form.inputData.value;
    delete paymentData.paymentDetailId;
    this.loader = true;
    this.paymentService.addPaymentDetails(paymentData).subscribe(res => {
      this.isSubmitted = false;
      this.form.inputData.reset();
      this.loader = false;
      this.message = 'Add';
      this.ngOnDestroy();
      this.getListPaymentDetails();
      this.modalSuccess = true;
      setTimeout(() => {
        this.modalSuccess = false;
      }, 1500);
    });
  }

  updatePayment() {
    const paymentData = this.form.inputData.value;
    console.log(paymentData);
    this.loader = true;
    this.paymentService.updatePaymentDetails(paymentData).subscribe(res => {
      this.isSubmitted = false;
      this.form.inputData.reset();
      this.loader = false;
      this.message = 'Update';
      this.ngOnDestroy();
      this.getListPaymentDetails();
      this.modalSuccess = true;
      setTimeout(() => {
        this.showAddNew();
        this.modalSuccess = false;
      }, 1500);
    });
  }

  deletePayment(id: number) {
    this.modalDelete = true;
    this.idToDelete = id;
  }

  ngOnInit(): void {
    this.getListPaymentDetails();
  }

  ngOnDestroy(): void {
    this.paymentService.message = this.message;
  }

  closeSuccess() {
    this.modalSuccess = false;
  }

  closeDelete() {
    this.modalDelete = false;
  }

  handleDeleteSuccess() {
    this.modalDelete = false;
    this.modalSuccess = true;
    setTimeout(() => {
      this.getListPaymentDetails();
      this.modalSuccess = false;
    }, 1500);
  }

}
