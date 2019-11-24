import { Component, Input,OnInit, Renderer2,Inject } from '@angular/core';
import { NbSortDirection, NbSortRequest, NbTreeGridDataSource, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { DOCUMENT } from '@angular/common';

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

  constructor(private renderer2: Renderer2,private dataSourceBuilder: NbTreeGridDataSourceBuilder<FSEntry>,@Inject(DOCUMENT) private _document) {
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
        { data: { Account: 'project-1.doc', balance: 'doc', due: '240 KB',payment:'2' } },
        { data: { Account: 'project-2.doc', balance: 'doc', due: '290 KB',payment:'2' } },
        { data: { Account: 'project-3', balance: 'txt', due: '466 KB',payment:'2' } },
        { data: { Account: 'project-4.docx', balance: 'docx', due: '900 KB',payment:'2' } },
      ],
    },
    {
      data: { Account: 'Debit',   kind:'dir'},
      children: [
        { data: { Account: 'Report 1', balance: 'doc', due: '100 KB',payment:'2' } },
        { data: { Account: 'Report 2', balance: 'doc', due: '300 KB',payment:'2' } },
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
    s.text = "(function (window) {var fastlinkBtn = document.getElementById('btn-fastlink');fastlinkBtn.addEventListener('click', function () {console.log('here');window.fastlink.open({fastLinkURL: 'https://node.sandbox.yodlee.com/authenticate/restserver',jwtToken: 'Bearer eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiIwMDk4YmVmMC0zOThlNThmNS04MTllLTQ5ZTMtODgwYy1lNTdjZGEyOGY4MjYiLCJpYXQiOjE1NzQ1NDgzMjEsImV4cCI6MTU3NDU1MDEyMSwic3ViIjoic2JNZW13YXVucEJ5cFJMT0VZMiJ9.nitdsnKFKwvFdx4s8OPy0AsBQS9u4GWXsgieZLzejKdHNV0raIZFpazDFOvg15rEBfQ6EktBuQz75rm_MYuuTbj54ln75Nk1DGfScfULkXC1XdXSi4XPrRF8ATr_O9NoEBT6F0nNlFqU0KucfboKEHzsl6DP9ilS-AIntBvoiBvUiM_3zCBwVxixTKWCBT8G1gcGX-lvbAHOftuQ8NmYHgXTnvAzhwbxIvIll3bo8vyN2F8jNc95A619tEUAqtnTOMM1ADNB5nYMBehw-GCl9GAs7_mfkw060YCZZRb6ynYUEzD3HJ6lKuL1a8m2_vpKF6qX1eMaez2DWYlK3XLc5g',onSuccess: function (data) {console.log(data);},onError: function (data) {console.log(data);},onExit: function (data) {console.log(data);},onEvent: function (data) {console.log(data);}}, 'container-fastlink');}, false);}(window));";
    this.renderer2.appendChild(this._document.body, s);
  }

  updateData(){
    this.data = [
      {
        data: { Account : 'Credit',   kind: 'dir' },
        children: [
          { data: { Account: 'project-1.doc', balance: 'doc', due: '240 KB',payment:'2' } },
         
        ],
      },
      {
        data: { Account: 'Debit',   kind:'dir'},
        children: [
          { data: { Account: 'Report 1', balance: 'doc', due: '100 KB',payment:'2' } },
         
        ],
      },
      
    ];
    this.dataSource = this.dataSourceBuilder.create(this.data);
 
   
    
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










  

 

  


