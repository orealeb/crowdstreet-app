import { Component } from '@angular/core';
import { Table }    from'../app/table';
import { TABLES } from '../app/mock-tables';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

  tables : Table[] = TABLES;
  currTable : Table = this.tables[0];

  title = 'crowdstreet-app';
  hideForm : boolean = true;
  isValidFormSubmitted: boolean = false;

  cancel(){
    //this.resetFields();
    this.hideForm = true;
  }
  showForm(name : string){
    this.currTable = this.tables.find(table => {return  table.name == name})
    this.hideForm = false;
  }

  onFormSubmit(form: NgForm) {
    this.isValidFormSubmitted = false;
    if (form.invalid) {
       return;
    }
    this.isValidFormSubmitted = true;
    this.submit(this.currTable.start, this.currTable.increment, this.currTable.max, this.currTable.width, this.currTable.selectedDir, this.currTable.name);
  }
  
  submit(start: number, increment: number, max: number, width: number, dir: string, tableName : string) { 
 
    let beginRow = 0;
    let endRow = 0;
    if(dir === 'LTR-UP'){
      beginRow = Math.floor((max-start)/5) - 1 > 0? Math.floor((max-start)/5) - 1: 1; // since columns are predefined to 5, calculate number of rows
      endRow = 0;
    }
    let table = new Array(beginRow);

    for (let row = beginRow; row >= endRow && start <= max; row--) {
      table[row] = new Array(5);
      for(let col = 0;  col < 5 && start <= max; col++){
        table[row][col] = start;
        start += increment;
      }
    }
    this.currTable.width = width;
    this.currTable.data = table;
  }



  resetFields(table : Table){
    table.start  = 0;
    table.increment = 0;
    table.max = 0;
    table.width = 20;
    table.selectedDir = table.directions[0];
    }

}
