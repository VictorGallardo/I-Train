import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ItemsService } from 'src/app/services/items.service';
import { IItem } from '../../interfaces/interfaces';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent {


  position: number;
  searchKey: string;

  dataSource: MatTableDataSource<IItem>;
  items: IItem[] = [];
  columns: string[] = ['num', 'id', 'title', 'description', 'created'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private itemsService: ItemsService) {

  }

  ngOnInit() {

    this.itemsService.getAllItems()
      .subscribe(resp => {
        console.log(resp);
        this.items.push(...resp.items);
        this.dataSource = new MatTableDataSource(this.items)
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });

  }

  search(ev: any) {
    const filter = (ev.target as HTMLInputElement).value;
    this.dataSource.filter = filter.trim().toLowerCase()
  }

  ngAfterViewInit() {

  }

}
