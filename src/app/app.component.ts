import { Component } from '@angular/core';
import { Table } from '../app/table';
import { TABLES } from '../app/mock-tables';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  tables: Table[] = TABLES;
  currTable: Table = this.tables[0];

  title = 'crowdstreet-app';
  hideForm: boolean = true;
  inputForm = new FormGroup({
    start: new FormControl(this.currTable.selectedDir, [Validators.required, Validators.min(0)]),
    increment: new FormControl(this.currTable.selectedDir, [Validators.required, Validators.min(0)]),
    max: new FormControl(this.currTable.selectedDir, [Validators.required, Validators.min(0)]),
    width: new FormControl(this.currTable.selectedDir, [Validators.required, Validators.min(0)]),
    selectedDir: new FormControl(this.currTable.selectedDir, [Validators.required]),
    name: new FormControl(this.currTable.name),
  })

  cancel() {
    //this.resetFields();
    this.hideForm = true;
  }
  showForm(name: string) {
    this.currTable = this.tables.find(table => { return table.name == name })
    this.hideForm = false;
  }

  onFormSubmit() {
    if (this.inputForm.invalid) {
      return;
    }
    this.currTable = this.inputForm.value;
    console.log(this.currTable.start, this.currTable.increment, this.currTable.max, this.currTable.width, this.currTable.selectedDir, this.currTable.name)
    this.submit(this.currTable.start, this.currTable.increment, this.currTable.max, this.currTable.width, this.currTable.selectedDir, this.currTable.name);
  }

  submit(start: number, increment: number, max: number, width: number, dir: string, tableName: string) {

    let beginRow = 0;
    let endRow = 0;
    if (dir === 'LTR-UP') {
      beginRow = Math.floor((max - start) / 5) - 1 > 0 ? Math.floor((max - start) / 5) - 1 : 1; // since columns are predefined to 5, calculate number of rows
      endRow = 0;
    }
    let table = new Array(beginRow);

    for (let row = beginRow; row >= endRow && start <= max; row--) {
      table[row] = new Array(5);
      for (let col = 0; col < 5 && start <= max; col++) {
        table[row][col] = start;
        start += increment;
      }
    }
    this.currTable.width = width;
    this.currTable.data = table;
  }

  get start() {
    return this.inputForm.get('start');
  }
  get increment() {
    return this.inputForm.get('increment');
  }
  get max() {
    return this.inputForm.get('max');
  }
  get width() {
    return this.inputForm.get('width');
  }
  get selectedDir() {
    return this.inputForm.get('selectedDir');
  }
  get name() {
    return this.inputForm.get('name');
  }

  resetFields(table: Table) {
    table.start = 0;
    table.increment = 0;
    table.max = 0;
    table.width = 20;
    table.selectedDir = table.directions[0];
  }

}
