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
    let token = "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIwMDk4YmVmMC0zOThlNThmNS04MTllLTQ5ZTMtODgwYy1lNTdjZGEyOGY4MjYiLCJpYXQiOjE1NzQ1NjgzMjgsImV4cCI6MTU3NDU3MDEyOCwic3ViIjoic2JNZW13YXVucEJ5cFJMT0VZMiJ9.OzrZKlKwWsl10l1YU8dawTLTrKAyQEN1cmPu_zYnwMFy_0b_5sHPox_ZYRahIgZh0txceY1AKzLw30nuhKwWlvA6g9gzlkP8goOltl56JDyhwQab17Yod_tCcNQZEbm1DjBXAipKeOTfTLCKbMJ4ShqgiM7J-SFd3fBe1PsFhTTaSpAiKt67_dZst_Oxuf7cZjQES0wVnzp3KZGekhCreJOvauGGKyniJ7RtZYBCpI9drGiEg9YMSYI3hOmZN7B9Y1UjJ-p4O_CTtJKzrx6sMvIPGBk1Gw6p0fJ3tBbWAqnszdov32bvvfM7Y0ADIUNCO4Ou4rTzaHNCyGZsqwffZg";
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










  

 

  


