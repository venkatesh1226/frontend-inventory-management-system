import { Component, OnInit } from '@angular/core';
import { Factory } from '../model/factory';
import { FactoryService } from '../services/factory-service/factory.service';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import { ProductComponent } from '../product/product.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogFactoryComponent } from '../dialog-factory/dialog-factory.component';

import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-factory',
  templateUrl: './factory.component.html',
  styleUrls: ['./factory.component.css']
})
export class FactoryComponent implements OnInit {


  constructor(private service: FactoryService, private route: Router,private dialog:MatDialog) {
    // this.isHome();
   }

  factories: Factory[] = [];
  faTrash = faTrash;
  faPlus = faPlus;

  ngOnInit(): void {
    this.service.getAllFactories().subscribe((items:Factory[])=>(this.factories=items));
  }

  delete(item: Factory) { 
    this.service.deleteFactory(item).subscribe((items: Factory[]) => (this.factories = items));
  }

  add() { 
    const dialogConfig = new MatDialogConfig();
    const ref = this.dialog.open(DialogFactoryComponent, dialogConfig);
    
    ref.afterClosed().subscribe(()=>(this.ngOnInit()))
  }

  navigate(fid?:number) { 
    this.route.navigate(['/factory/' + fid]);
  }

  isHome():Boolean { 
    return this.route.url.trim()==='/';
  }

  home() { 
    this.route.navigate(['../']);
  }


}
