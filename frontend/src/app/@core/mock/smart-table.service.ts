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
    return this.httpClient.get('http://172.20.44.4:5000/api/v1/users');
  }

  getAccount(){
    return this.httpClient.get('https://sandbox.api.yodlee.com/ysl/accounts', {
      headers: {'Api-Version':'1.1','Authorization':'Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIwMDk4YmVmMC0zOThlNThmNS04MTllLTQ5ZTMtODgwYy1lNTdjZGEyOGY4MjYiLCJpYXQiOjE1NzQ1Nzg2NzYsImV4cCI6MTU3NDU4MDQ3Niwic3ViIjoic2JNZW13YXVucEJ5cFJMT0VZMiJ9.gsO5IB0Gf62fzY6DRIqaxtmMswdF4T_cAXT-CZe1rqVOwbd9rjtK6IEqPBxsEOc4D4Nn5kIjknTR_Wljn3HiDRWr633mjVVt8leY00NVUIi_FAIZpL6IlEq16W2Z6lYS7TBkQRgWHWT5KR9YNUi38kE1MGK1b8mZ4KQ7OAaBCOtFo1DFZP163FqMJx_XlUzm0_mvyMxdRTnw7_Me4vJ2KpHUJwKJpCP1leK0VKMwhLtOmipOfE9yJCOCYvPB0bdEKr_5zjOHij--H0VahaDxklSm4DG5Sg-eW78A2QZwIxpAqPH4nX_jY9F62w7hI49Z2ExNwbPAYDsqQktxKEn-qQ'}
   });
  }

  getTransactions(){
    return this.httpClient.get('https://sandbox.api.yodlee.com/ysl/transactions', {
      headers: {'Api-Version':'1.1','Authorization':'Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIwMDk4YmVmMC0zOThlNThmNS04MTllLTQ5ZTMtODgwYy1lNTdjZGEyOGY4MjYiLCJpYXQiOjE1NzQ1Nzg2NzYsImV4cCI6MTU3NDU4MDQ3Niwic3ViIjoic2JNZW13YXVucEJ5cFJMT0VZMiJ9.gsO5IB0Gf62fzY6DRIqaxtmMswdF4T_cAXT-CZe1rqVOwbd9rjtK6IEqPBxsEOc4D4Nn5kIjknTR_Wljn3HiDRWr633mjVVt8leY00NVUIi_FAIZpL6IlEq16W2Z6lYS7TBkQRgWHWT5KR9YNUi38kE1MGK1b8mZ4KQ7OAaBCOtFo1DFZP163FqMJx_XlUzm0_mvyMxdRTnw7_Me4vJ2KpHUJwKJpCP1leK0VKMwhLtOmipOfE9yJCOCYvPB0bdEKr_5zjOHij--H0VahaDxklSm4DG5Sg-eW78A2QZwIxpAqPH4nX_jY9F62w7hI49Z2ExNwbPAYDsqQktxKEn-qQ'}
   });
  }

  getUser(){
    return this.httpClient.get('http://172.20.44.4:5000/api/v1/users');
  }
}
