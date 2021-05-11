import { Component, ViewChild, OnInit } from '@angular/core';
import { MatFormFieldControl } from '@angular/material/form-field';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { IUser } from '../../interfaces/interfaces';
import { UsersService } from '../../services/users.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],

})
export class UsersComponent implements OnInit {


  position: number;
  searchKey: string;

  dataSource: MatTableDataSource<IUser>;
  users: IUser[] = [];
  columns: string[] = ['num', 'id', 'email', 'name', 'role'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private usersService: UsersService) {

  }

  ngOnInit() {

    this.usersService.getAllUsers()
      .subscribe(resp => {
        console.log(resp);
        this.users.push(...resp.users);
        this.dataSource = new MatTableDataSource(this.users)
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







