import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalSuccessComponent } from './components/modals/modal-success/modal-success.component';
import { ModalDeleteComponent } from './components/modals/modal-delete/modal-delete.component';
import { HttpClientModule } from '@angular/common/http';
import { HelperModule } from '../helper/helper.module';


@NgModule({
  declarations: [
    HomeComponent,
    ModalSuccessComponent,
    ModalDeleteComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    HelperModule
  ],
  exports: [
    HomeComponent,
    ModalSuccessComponent,
    ModalDeleteComponent
  ],
})
export class PaymentModule { }
