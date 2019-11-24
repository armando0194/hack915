import { Component, Input,OnInit, Renderer2,Inject } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { DOCUMENT } from '@angular/common';
import { SmartTableData } from '../../../@core/data/smart-table';

interface TreeNode<T> {
  data: T;
  children?: TreeNode<T>[];
  expanded?: boolean;
}

interface FSEntry {
  
  Account: string;
  balance?: string;
  due?: string;
  payment? :string;
  kind?:string;
}

@Component({
  selector: 'ngx-tree-grid',
  templateUrl: './tree-grid.component.html',
  styleUrls: ['./tree-grid.component.scss'],
})
export class TreeGridComponent {
  customColumn = 'Account';
  defaultColumns = [ 'balance', 'due', 'payment' ];
  allColumns = [ this.customColumn, ...this.defaultColumns ];

  dataSource: NbTreeGridDataSource<FSEntry>;

  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;

  constructor(private renderer2: Renderer2,private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,@Inject(DOCUMENT) private _document, private service: SmartTableData) {
    this.dataSource = this.dataSourceBuilder.create(this.data);
  }
  


  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }

  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }

  private data: TreeNode<FSEntry>[] = [
    {
      data: { Account : 'Credit',   kind: 'dir' },
      children: [
      
      ],
    },
    {
      data: { Account: 'Debit',   kind:'dir'},
      children: [
     
      ],
    },
    
  ];

  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + (nextColumnStep * index);
  }

   ngOnInit(){
    const s = this.renderer2.createElement('script');
    s.type = 'text/javascript';
    s.onload = this.loadNextScript.bind(this);
    s.src = 'https://cdn.yodlee.com/fastlink/v1/initialize.js';
    s.text = ``;
    this.renderer2.appendChild(this._document.body, s); 


  }


  loadNextScript(){
    const s = this.renderer2.createElement('script');
    let token = "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIwMDk4YmVmMC0zOThlNThmNS04MTllLTQ5ZTMtODgwYy1lNTdjZGEyOGY4MjYiLCJpYXQiOjE1NzQ1ODQwNTAsImV4cCI6MTU3NDU4NTg1MCwic3ViIjoic2JNZW13YXVucEJ5cFJMT0VZMiJ9.T1ISMeoEZozby8wDMy3jFbV21UOJS0hmyUgdMMdstmNSYh3ZASFpJxJui7WGbY5YT84LiLvo9j19HPwoyYGvB2nUNMxU4voycRCjP5tbicGWY6YCuoZTMra6fJm1zsNnatMvDnWX2cbDWjPC78WP80nmlrYCqR7rokx4iyX1H-U4GGgMR3E6AGRZEo7MylmQxUYuweuM7UPyE4k6q70IGKhhcBTvCtjK_pJZ-c_LLkoFR3r4vkLnIQittkF_JXYlDBBxfda407_xcvJ8-j23dbJTRNSYwNCRqC86E2t8rS25UeUMDCmPyJrYDKrU4DoQBKaeME8PmoXh_NxAXtNzMA";
    s.text = "(function (window) {var fastlinkBtn = document.getElementById('btn-fastlink');fastlinkBtn.addEventListener('click', function () {console.log('here');window.fastlink.open({fastLinkURL: 'https://node.sandbox.yodlee.com/authenticate/restserver',jwtToken: 'Bearer "+token+"',onSuccess: function (data) {console.log(data);},onError: function (data) {console.log(data);},onExit: function (data) {console.log(data);},onEvent: function (data) {console.log(data);}}, 'container-fastlink');}, false);}(window));";
    this.renderer2.appendChild(this._document.body, s);
    
  }

  updateData(){
    this.data = [
      {
        data: { Account : 'Credit',   kind: 'dir' },
        children: [
          // { data: { Account: 'project-1.doc', balance: 'doc', due: '240 KB',payment:'2' } },
         
        ],
      },
      {
        data: { Account: 'Debit',   kind:'dir'},
        children: [
          // { data: { Account: 'Report 1', balance: 'doc', due: '100 KB',payment:'2' } },
         
        ],
      },      
    ];


    this.service.getAccount().subscribe(res => {

      for (let i =0; i < res['account'].length; i ++){
        console.log(res['account'][i]);
        if (res['account'][i]['accountType'] == 'CREDIT' || res['account'][i]['accountType'] == 'OTHER'){
          console.log("here");
          let ob_data = {data: { Account: res['account'][i]['accountName'], balance: res['account'][i]['availableCredit']['amount'], due: res['account'][i]['dueDate'],payment:res['account'][i]['lastPaymentAmount']['amount'] } };
            console.log(ob_data);
          this.data[0]['children'].push( ob_data);
        }
        else {
          let ob_data = {data: { Account: res['account'][i]['accountName'], balance: res['account'][i]['availableBalance']['amount'], due: "",payment:"" } };
          
          this.data[1]['children'].push( ob_data);
        }
      }

      this.dataSource = this.dataSourceBuilder.create(this.data);
      // res.forEach(element => {
      //   
      // });
      
    });
    // this.dataSource = this.dataSourceBuilder.create(this.data);
 
   
    
  }

  
}

@Component({
  selector: 'ngx-fs-icon',
  template: `
    <nb-tree-grid-row-toggle [expanded]="expanded" *ngIf="isDir(); else fileIcon">
    </nb-tree-grid-row-toggle>
    <ng-template #fileIcon>
      <nb-icon icon="file-text-outline"></nb-icon>
    </ng-template>
  `,
})
export class FsIconComponent {
  @Input() kind: string;
  @Input() expanded: boolean;

  isDir(): boolean {
    return this.kind === 'dir';
  }
}



//////










  

 

  


