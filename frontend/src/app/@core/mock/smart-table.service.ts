import { Injectable } from '@angular/core';
import { SmartTableData } from '../data/smart-table';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { tap, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class SmartTableService extends SmartTableData {

  data = [{
    title: 'Tuition',
    amount: '700',
    category: 'School',
  }, {
    title: 'Car',
    amount: '300',
    category: 'Loan',
  },{
    title: 'Loans',
    amount: '200',
    category: 'School',
  },{
    title: 'Subscriptions',
    amount: '50',
    category: 'Entertainment',
  },{
    title: 'Groceries',
    amount: '150',
    category: 'Food',
  },
  {
    title: 'Gas',
    amount: '80',
    category: 'Transportation',
  },
  {
    title: 'Aprtment',
    amount: '1000',
    category: 'Housing',
  }];
  constructor(private httpClient: HttpClient){
    super();
  }

  getData() {
    return this.httpClient.get('http://172.20.20.26:5000/api/v1/users');
  }
}
