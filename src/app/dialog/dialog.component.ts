import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../model/product';
import { ProductService } from '../services/product-service/product.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  productName: string ;
  productQuantity: number = 0;
  productDescription: string = "";
  heading: string = "Heading"
  disable: boolean 
  imageLink:string=""
  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    private productService:ProductService,
    @Inject(MAT_DIALOG_DATA) private data:any) {
    this.productName = data.product.productName
    this.productQuantity = data.product.quantity
    this.productDescription=data.product.description
    this.disable = !data.edit
    // console.log(data)
    if (data.product.productId == null) {
        this.heading="Add New Product"
    }
    else { 
      if (data.edit == false) {
        this.heading="Veiwing Product :"+this.productName
       }
      else { 
        this.heading="Editing Product :"+this.productName
      }
    }
     }

  ngOnInit(): void {
  }

  submit() {
    this.validate();
    const p: Product = {
      productId:this.data.product.productId,
      productName: this.productName,
      quantity: this.productQuantity,
      description: this.productDescription,
      factoryId: this.data.product.factoryId,
      pic: this.imageLink
    }
    //add product
    if (this.data.product.productId === null) {
      this.productService.addProduct(p).subscribe((items:Product[])=>(this.dialogRef.close(items)));
      
    }
    //edit product
    else { 

      this.productService.editProduct(p).subscribe((items:Product[]) => (this.dialogRef.close(items)));
    }
  }

  validate() { 

  }

  fileName = ' ';

  onFileSelected(e?: Event) { 
    
    const target = e?.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (file) { 
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("thumbnail", file);
      this.productService.uploadFile(formData).subscribe((link: string) => (this.imageLink = link));
    }
  }

}
