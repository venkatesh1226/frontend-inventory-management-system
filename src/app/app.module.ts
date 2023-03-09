import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FactoryComponent } from './factory/factory.component';
import { ProductComponent } from './product/product.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RoundbtnComponent } from './roundbtn/roundbtn.component'
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DialogComponent } from './dialog/dialog.component';
import { MatRippleModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { DialogFactoryComponent } from './dialog-factory/dialog-factory.component';
import { Dialog } from '@angular/cdk/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { OrderDialogComponent } from './order-dialog/order-dialog.component'

@NgModule({
  declarations: [
    AppComponent,
    FactoryComponent,
    ProductComponent,
    RoundbtnComponent,
    DialogComponent,
    DialogFactoryComponent,
    DeleteDialogComponent,
    OrderDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatRippleModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    
   
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    DialogComponent,
  ]
})
export class AppModule { }
