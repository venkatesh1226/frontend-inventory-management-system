import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Factory } from '../model/factory';
import { FactoryService } from '../services/factory-service/factory.service';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-factory',
  templateUrl: './dialog-factory.component.html',
  styleUrls: ['./dialog-factory.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class DialogFactoryComponent implements OnInit {

  heading: string = "Add Product"
  factoryName: string = ""
  location:string=""
  constructor(private service:FactoryService,private dialogRef: MatDialogRef<DialogFactoryComponent>) { }

  ngOnInit(): void {
  }

  submit() { 
    this.validate();
    const f:Factory = {
      factoryName: this.factoryName.trim(),
      factoryLocation: this.location.trim()
    }
    this.service.addFactory(f).subscribe((items) => (this.dialogRef.close(items)));
  }
  validate() { 

  }
  onNoClick() { 
    this.dialogRef.close();
  }

}
