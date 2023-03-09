import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QueueClient, QueueServiceClient } from "@azure/storage-queue";
// import AzureStorageQueue = require("@azure/storage-queue");
import { GlobalConstants } from '../global-constants';

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
    @Inject(MAT_DIALOG_DATA) private data: any) { 

      this.name=data.product.productName;
      this.heading+=this.name;
    }

  ngOnInit(): void {
  }

  async submit(){
    const sas: string= GlobalConstants.sas;
    const account="assessmentstorageacc";
    const queueName="venkatesh-orders-queue"
    
    const queueServiceClient = new QueueServiceClient('https://assessmentstorageacc.queue.core.windows.net'+GlobalConstants.sas)

    const queueClient = queueServiceClient.getQueueClient(queueName);

    const order:Object={
      product:this.data.product,
      count: this.count,
      time: Date.now()
    }

    const str=this.jsonToBase64(order);
    const response= await queueClient.sendMessage(str);
    console.log(response);

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
