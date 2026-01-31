import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BarChart } from '../../components/bar-chart/bar-chart';

@Component({
  selector: 'app-chart-page',
  imports: [BarChart],
  templateUrl: './chart-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartPage {}
