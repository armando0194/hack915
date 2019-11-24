import { Component, OnDestroy } from '@angular/core';
import { ProgressInfo, StatsProgressBarData } from '../../../@core/data/stats-progress-bar';
import { SmartTableData } from '../../../@core/data/smart-table';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'ngx-progress-section',
  styleUrls: ['./progress-section.component.scss'],
  templateUrl: './progress-section.component.html',
})
export class ECommerceProgressSectionComponent implements OnDestroy {

  private alive = true;

  progressInfoData: ProgressInfo[];

  constructor(private statsProgressBarService: StatsProgressBarData, private pleaseWork: SmartTableData) {
    this.progressInfoData =[];
    this.pleaseWork.getData().subscribe(data => {
        console.log("Here");
        console.log(data[2]);
        
        let expenses = 0;
        for (let i = 0; i < data[2]["expenses"].length; i ++)
          expenses += + data[2]["expenses"][i]['amount'];
        
        console.log(expenses);

        this.progressInfoData.push( {title: "Income", value: data[2]["income"], activeProgress: 100, description: "Monthly income"});
        this.progressInfoData.push( {title: "Expenses", value: expenses, activeProgress: (expenses * 100)/data[2]["income"], description: "Expenses takes "+Math.round((expenses * 100)/data[2]["income"])+"% of your income"});
        this.progressInfoData.push( {title: "Take Home", value: (data[2]["income"] * .89)-expenses, activeProgress: (((data[2]["income"] * .89)-expenses) * 100)/data[2]["income"], description: "Your Take Home after taxes and expenses is "+Math.round((((data[2]["income"] * .89)-expenses) * 100)/data[2]["income"])+"% of your income"});
      });
//       0 
// 1 {title: "Expenses", value: 6378, activeProgress: 60, description: "Better than last week (30%)"}
// 2 {title: "Take Home", value: 200, activeProgress: 40, description: "Better than last week (55%)"}
  }

  ngOnDestroy() {
    this.alive = true;
  }
}
