import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { BarChart } from '../../components/bar-chart/bar-chart';
import { ChartForm } from '../../components/chart-form/chart-form';

@Component({
  selector: 'app-chart-page',
  imports: [BarChart, ChartForm],
  templateUrl: './chart-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartPage {
  chartData = computed(() => ({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3, 7],
        borderWidth: 1,
      },
    ],
  }));
}
