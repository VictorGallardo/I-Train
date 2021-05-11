import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ListsService } from 'src/app/services/lists.service';
import { IList } from '../../interfaces/interfaces';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent {


  position: number;
  searchKey: string;

  dataSource: MatTableDataSource<IList>;
  lists: IList[] = [];
  columns: string[] = ['num', 'id', 'title', 'user', 'created'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private listsService: ListsService) {

  }

  ngOnInit() {

    this.listsService.getAllLists()
      .subscribe(resp => {
        console.log(resp);
        this.lists.push(...resp.lists);
        this.dataSource = new MatTableDataSource(this.lists)
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

