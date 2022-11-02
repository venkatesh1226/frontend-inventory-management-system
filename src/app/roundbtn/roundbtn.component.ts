import { Component, Input, Output,EventEmitter, OnInit } from '@angular/core'; 

@Component({
  selector: 'app-roundbtn',
  templateUrl: './roundbtn.component.html',
  styleUrls: ['./roundbtn.component.css']
})
export class RoundbtnComponent implements OnInit {

  @Output()
  clicker: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  add() { 
    this.clicker.emit();
  }

}
