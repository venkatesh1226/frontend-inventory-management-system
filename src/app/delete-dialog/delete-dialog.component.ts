import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {
  heading: String = "Are You Sure You Want To Delete ";

  constructor(private dialogRef: MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) private data: any) { 
    this.heading += data.heading +"?";
  }

  ngOnInit(): void {
  }

  onNoClick() { 
    this.dialogRef.close(false);
  }
  onClickYes() { 
    this.dialogRef.close(true);
  }
}
