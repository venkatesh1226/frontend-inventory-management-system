import { Component, Input, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Factory } from '../model/factory';
import { Product } from '../model/product';
import { FactoryService } from '../services/factory-service/factory.service';
import { ProductService } from '../services/product-service/product.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  fid?: number;

  factory?: Factory;
  products?: Product[];

  
  faTrash = faTrash;
   dialogConfig = new MatDialogConfig();

  constructor(private router: Router,private fService:FactoryService,private pService:ProductService,private dialog:MatDialog) {
   }

  ngOnInit(): void {
    this.fid = parseInt(this.router.url.split('/')[2]);
    this.fService.getFactoryById(this.fid).subscribe((item: Factory) => (this.factory = item));
    this.pService.getProducts(this.fid).subscribe((items: Product[]) => (this.products = items));
    this.dialogConfig.autoFocus = true;
  }

  add() { 

    // dialogConfig.disableClose = true;
  
    this.dialogConfig.data = {
      edit: true,
      product: {
        productId: null,
        productName: "",
        quantity: 0,
        description: "",
        factoryId: this.fid,
        picLink: "",
        panelClass: 'my-dialog',
      }
    }
    const ref = this.dialog.open(DialogComponent, this.dialogConfig);
    ref.afterClosed().subscribe(()=>(this.ngOnInit()))
  }

  placeOrder(item: Product){
    console.log(item.productName)
    this.dialogConfig.data={
      product:item,
      panelClass:'order-dialog'
    }
      const ref=this.dialog.open(OrderDialogComponent, this.dialogConfig);
      ref.afterClosed().subscribe(()=>(this.ngOnInit()));
  }

  viewMore(item: Product) { 
    this.dialogConfig.data = {
      edit: false,
      product: item,
      panelClass: 'my-dialog',
    }
    this.dialog.open( DialogComponent,this.dialogConfig);
  }

  edit(product: Product) { 
    this.dialogConfig.data = {
      edit: true,
      product:product
    }
    const ref = this.dialog.open(DialogComponent, this.dialogConfig);
    ref.afterClosed().subscribe(()=>(this.ngOnInit()));
  }

  delete(product: Product) { 
    const confirmDelete = new MatDialogConfig();
    confirmDelete.data = {
      heading: product.productName
    }
    const ref = this.dialog.open(DeleteDialogComponent, confirmDelete);
    ref.afterClosed().subscribe((res:boolean) => {
      if (res) { 
        this.pService.deleteProduct(product).subscribe(() => { 
          
          this.pService
            .getProducts(product.factoryId).subscribe((items: Product[]) => (this.products = items));
        });
      }
    })
  }
}
