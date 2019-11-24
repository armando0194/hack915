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

  getAccount(){
    return this.httpClient.get('https://sandbox.api.yodlee.com/ysl/accounts', {
      headers: {'Api-Version':'1.1','Authorization':'Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIwMDk4YmVmMC0zOThlNThmNS04MTllLTQ5ZTMtODgwYy1lNTdjZGEyOGY4MjYiLCJpYXQiOjE1NzQ1NzQwNDcsImV4cCI6MTU3NDU3NTg0Nywic3ViIjoic2JNZW13YXVucEJ5cFJMT0VZMiJ9.ANVjiaZejbHhmfLZyWz1L5YCezQR3q6ASmUzAVD264WuN23A1Xp1dmIGAoyvaFbbcVkd1UnZYclyEhRY6quNy1Vx6QcbIuvdkrQrWnFmfMf05A-sWXw_ZCs1Ugc2IOfp2CjwnO917D1EkgxIl39ekIjll5RtSqzwi7SKy2-Yc4emTrMpjOTjwFbrY8wFtSY84LHeJgwfDVU26fDxNtI7oWWC63HUMZcsihQpBYLAgTk4DiD35VeM2ZaQjNH3cLcypLhgpC9FcLbm8N1c78PXITF8ctPZNrVh7PlU9DyqxTbBk4UFfod34RMHYc1h56S0N9OUeLgevqLUdys6UsZ5qg'}
   });
  }

  getTransactions(){
    return this.httpClient.get('https://sandbox.api.yodlee.com/ysl/transactions', {
      headers: {'Api-Version':'1.1','Authorization':'Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIwMDk4YmVmMC0zOThlNThmNS04MTllLTQ5ZTMtODgwYy1lNTdjZGEyOGY4MjYiLCJpYXQiOjE1NzQ1NzQwNDcsImV4cCI6MTU3NDU3NTg0Nywic3ViIjoic2JNZW13YXVucEJ5cFJMT0VZMiJ9.ANVjiaZejbHhmfLZyWz1L5YCezQR3q6ASmUzAVD264WuN23A1Xp1dmIGAoyvaFbbcVkd1UnZYclyEhRY6quNy1Vx6QcbIuvdkrQrWnFmfMf05A-sWXw_ZCs1Ugc2IOfp2CjwnO917D1EkgxIl39ekIjll5RtSqzwi7SKy2-Yc4emTrMpjOTjwFbrY8wFtSY84LHeJgwfDVU26fDxNtI7oWWC63HUMZcsihQpBYLAgTk4DiD35VeM2ZaQjNH3cLcypLhgpC9FcLbm8N1c78PXITF8ctPZNrVh7PlU9DyqxTbBk4UFfod34RMHYc1h56S0N9OUeLgevqLUdys6UsZ5qg'}
   });
  }
}
