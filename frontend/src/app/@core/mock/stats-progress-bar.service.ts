import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { ProgressInfo, StatsProgressBarData } from '../data/stats-progress-bar';

@Injectable()
export class StatsProgressBarService extends StatsProgressBarData {
  private progressInfoData: ProgressInfo[] = [
    {
      title: 'Income',
      value: 40000,
      activeProgress: 100,
      description: 'Better than last week (70%)',
    },
    {
      title: 'Expenses',
      value: 6378,
      activeProgress: 60,
      description: 'Better than last week (30%)',
    },
    {
      title: 'Take Home',
      value: 200,
      activeProgress: 40,
      description: 'Better than last week (55%)',
    },
  ];

  getProgressInfoData(): Observable<ProgressInfo[]> {
    return observableOf(this.progressInfoData);
  }
}
