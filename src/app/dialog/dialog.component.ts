import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../model/product';
import { ProductService } from '../services/product-service/product.service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom 
})
export class DialogComponent implements OnInit {


  productName: string ;
  productQuantity: number = 0;
  productDescription: string = "";
  heading: string = "Heading"
  disable: boolean 
  imageLink: string = ""
  formData = new FormData();
  image: any;
  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    private productService:ProductService,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private sanitizer : DomSanitizer) {
    this.productName = data.product.productName
    this.productQuantity = data.product.quantity
    this.productDescription = data.product.description
    this.disable = !data.edit
    this.imageLink=data.product.picLink
    // console.log(data)
    if (data.product.productId == null) {
        this.heading="Add New Product "
    }
    else { 
      if (data.edit == false) {
        this.heading="Viewing Product : "+this.productName
       }
      else { 
        this.heading="Editing Product : "+this.productName
      }
    }
    this.download();
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
      picLink: this.imageLink
    }
    //add product
    if (this.data.product.productId === null) {
      this.productService.addProduct(p).subscribe((items:Product[])=>(this.dialogRef.close(items)));
      
    }
    //edit product
    else { 

      this.productService.editProduct(p).subscribe((items:Product[]) => (this.dialogRef.close(items)));
    }
    console.log(p.picLink);
  }

  validate() { 

  }

  fileName = ' ';

  onFileSelected(e?: Event) { 
    
    const target = e?.target as HTMLInputElement;
    const file: File = (target.files as FileList)[0];
    if (file) { 
      this.fileName = file.name;
      this.formData.append("file", file);
      this.upload();

     
    }
  }
  upload() {
    this.productService.uploadFile(this.formData).subscribe({next: (link: string) =>(this.imageLink = link),
      error: (error => {
        this.imageLink = error.error.text;
        console.log(this.imageLink)
      })
    });
  }

  download() { 
    console.log(this.imageLink)
    console.log("hello")
    // this.isImageLoading = true;
    this.productService.loadFile(this.imageLink).subscribe(data => {
      console.log(typeof data);
        this.createImageFromBlob(data);
        // this.isImageLoading = false;
      }, error => {
        // this.isImageLoading = false;
        console.log(error);
      });
  }

  createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    reader.addEventListener("load", () => {
       this.image = reader.result;
    }, false);
 
    if (image) {
      console.log(image)
       reader.readAsDataURL(image);
    }
    this.image = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(image));
    console.log(this.image)
    console.log(window.URL.createObjectURL(image))
  }

  onNoClick() { 
    this.dialogRef.close();
  }

}
