import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QueueClient, QueueServiceClient } from "@azure/storage-queue";
// import AzureStorageQueue = require("@azure/storage-queue");
import { GlobalConstants } from '../global-constants';
import { Order } from '../model/order';
import { OrderService } from '../services/order-service/order.service';

@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent implements OnInit {

  heading: string="Ordering "
  name: string=""
  count:number =0;

  constructor(private dialogRef: MatDialogRef<OrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any, private service:OrderService) { 

      this.name=data.product.productName;
      this.heading+=this.name;
    }

  ngOnInit(): void {
  }

   submit(){
   //call order service api

    const order:Order={
      pId:this.data.product.productId,
      count: this.count,
      time: Date.now(),
      status: "QUEUED"
    }
    
    this.service.placeOrder(order).subscribe((id)=>{
      console.log("ORDER ID:"+id);
      this.onNoClick();
  });


  }

 jsonToBase64(jsonObj: Object) {
    const jsonString = JSON.stringify(jsonObj)
    return  Buffer.from(jsonString).toString('base64')
}
 encodeBase64ToJson(base64String:string) {
    const jsonString = Buffer.from(base64String,'base64').toString()
    return JSON.parse(jsonString)
}

  onNoClick(){
    this.dialogRef.close();
  }

  
}
