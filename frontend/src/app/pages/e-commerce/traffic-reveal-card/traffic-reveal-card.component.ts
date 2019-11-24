import { Component, OnDestroy, ComponentFactoryResolver } from '@angular/core';
import { TrafficList, TrafficListData } from '../../../@core/data/traffic-list';
import { TrafficBarData, TrafficBar } from '../../../@core/data/traffic-bar';
import { SmartTableService} from '../../../@core/mock/smart-table.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-traffic-reveal-card',
  styleUrls: ['./traffic-reveal-card.component.scss'],
  templateUrl: './traffic-reveal-card.component.html',
})
export class TrafficRevealCardComponent implements OnDestroy {

  private alive = true;

  trafficBarData: TrafficBar;
  trafficListData: any[];
  revealed = false;
  period: string = 'week';

  constructor(private trafficListService: TrafficListData,
              private trafficBarService: TrafficBarData,  private service: SmartTableService) {
    this.getTrafficFrontCardData(this.period);
    this.getTrafficBackCardData(this.period);
  }

  toggleView() {
    this.revealed = !this.revealed;
  }

  setPeriodAngGetData(value: string): void {
    this.period = value;

    this.getTrafficFrontCardData(value);
    this.getTrafficBackCardData(value);
  }

  getTrafficBackCardData(period: string) {
    this.trafficBarService.getTrafficBarData(period)
      .pipe(takeWhile(() => this.alive ))
      .subscribe(trafficBarData => {
        this.trafficBarData = trafficBarData;
      });
  }

  getTrafficFrontCardData(period: string) {
    this.service.getTransactions().subscribe(res => {
      console.log("hola");
      console.log(res['transaction']);
      
      this.trafficListData = [];
      for (let i =0; i < res['transaction'].length; i ++){
          console.log(res['transaction'][i]['categoryType']);
          let tra;
          if (res['transaction'][i]['categoryType'] != 'TRANSFER')
          {
            tra = {
              comparison: {prevDate: "Sun", prevValue: 47, nextDate: "Mon", nextValue: 45},
              date: res['transaction'][i]['categoryType'],
              delta: {up: false, value:  Math.round(Math.random() * (15 - 1) + 1)},
              value: res['transaction'][i]['amount']['amount'] + res['transaction'][i]['amount']['currency'] ,
            };
          }
          else {
            tra = {
              comparison: {prevDate: "Sun", prevValue: 47, nextDate: "Mon", nextValue: 45},
              date: res['transaction'][i]['categoryType'],
              delta: {up: true, value:  Math.round(Math.random() * (15 - 1) + 1)},
              value: res['transaction'][i]['amount']['amount'] + res['transaction'][i]['amount']['currency'] ,
            };
          }
          
          
          this.trafficListData.push(tra);
      }
      
      
      // 
    });
    // this.trafficListService.getTrafficListData(period)
      // .pipe(takeWhile(() => this.alive))
      // .subscribe(trafficListData => {
      //   this.trafficListData = trafficListData;
      //   console.log(this.trafficListData);
      // });
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
