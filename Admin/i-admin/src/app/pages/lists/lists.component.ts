import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent {

  displayedColumns: string[] = ['position', 'email', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor() { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}

export interface PeriodicElement {
  email: string;
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, email: 'ejemlo@mail.com', name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, email: 'ejemlo@mail.com', name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, email: 'ejemlo@mail.com', name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, email: 'ejemlo@mail.com', name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, email: 'ejemlo@mail.com', name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, email: 'ejemlo@mail.com', name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, email: 'ejemlo@mail.com', name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, email: 'ejemlo@mail.com', name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, email: 'ejemlo@mail.com', name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, email: 'ejemlo@mail.com', name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, email: 'ejemlo@mail.com', name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, email: 'ejemlo@mail.com', name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, email: 'ejemlo@mail.com', name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, email: 'ejemlo@mail.com', name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, email: 'ejemlo@mail.com', name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, email: 'ejemlo@mail.com', name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, email: 'ejemlo@mail.com', name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, email: 'ejemlo@mail.com', name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, email: 'ejemlo@mail.com', name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, email: 'ejemlo@mail.com', name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];

