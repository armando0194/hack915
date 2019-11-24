import { Injectable } from '@angular/core';
import { SmartTableData } from '../data/smart-table';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { tap, catchError } from 'rxjs/operators';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { StyleTypes } from '@swimlane/ngx-charts';


@Injectable()
export class SmartTableService extends SmartTableData {

  data = {
    name: "Daniel Ornelas",
      id: 1,
      income: 2700,
      state: "tx",
      expenses: [
        {
          title: "Tuition",
          amount: "100",
          category: "School"
        },
        {
          title: "Car",
          amount: "300",
          category: "Loan"
        },
        {
          title: "Loans",
          amount: "200",
          category: "School"
        },
        {
          title: "Subscriptions",
          amount: "50",
          category: "Entertainment"
        },
        {
          title: "Groceries",
          amount: "150",
          category: "Food"
        },
        {
          title: "Gas",
          amount: "80",
          category: "Transportation"
        },
        {
          title: "Aprtment",
          amount: "1000",
          category: "Housing"
        }
      ]
    };
  
  api_key: string = 'eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIwMDk4YmVmMC0zOThlNThmNS04MTllLTQ5ZTMtODgwYy1lNTdjZGEyOGY4MjYiLCJpYXQiOjE1NzQ1ODQwNTAsImV4cCI6MTU3NDU4NTg1MCwic3ViIjoic2JNZW13YXVucEJ5cFJMT0VZMiJ9.T1ISMeoEZozby8wDMy3jFbV21UOJS0hmyUgdMMdstmNSYh3ZASFpJxJui7WGbY5YT84LiLvo9j19HPwoyYGvB2nUNMxU4voycRCjP5tbicGWY6YCuoZTMra6fJm1zsNnatMvDnWX2cbDWjPC78WP80nmlrYCqR7rokx4iyX1H-U4GGgMR3E6AGRZEo7MylmQxUYuweuM7UPyE4k6q70IGKhhcBTvCtjK_pJZ-c_LLkoFR3r4vkLnIQittkF_JXYlDBBxfda407_xcvJ8-j23dbJTRNSYwNCRqC86E2t8rS25UeUMDCmPyJrYDKrU4DoQBKaeME8PmoXh_NxAXtNzMA';

  constructor(private httpClient: HttpClient){
    super();
  }

  getData() {
    return this.httpClient.get('http://172.20.44.4:5000/api/v1/users');
  }

  updateData(income) {
    this.data['income'] = income;
    return this.httpClient.post('http://172.20.44.4:5000/api/v1/users/1', this.data);
  }

  getAccount(){
    return this.httpClient.get('https://sandbox.api.yodlee.com/ysl/accounts', {
      headers: {'Api-Version':'1.1','Authorization':'Bearer '+ this.api_key}
   });
  }

  getTransactions(){
    return this.httpClient.get('https://sandbox.api.yodlee.com/ysl/transactions', {
      headers: {'Api-Version':'1.1','Authorization':'Bearer '+ this.api_key}
   });
  }

  getUser(){
    return this.httpClient.get('http://172.20.44.4:5000/api/v1/users');
  }
}
