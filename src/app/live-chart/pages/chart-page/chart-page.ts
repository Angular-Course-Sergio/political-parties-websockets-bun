import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { BarChart } from '../../components/bar-chart/bar-chart';
import { ChartForm } from '../../components/chart-form/chart-form';
import { WebSocketConnectionService } from '../../../web-sockets/services/web-socket-connection.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chart-page',
  imports: [BarChart, ChartForm],
  templateUrl: './chart-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartPage implements OnInit, OnDestroy {
  webSocketService = inject(WebSocketConnectionService);

  onMessageSubscription: Subscription | null = null;

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

  ngOnInit(): void {
    this.onMessageSubscription = this.webSocketService.onMessage.subscribe((message) => {
      console.log('New message from server:', message);
    });
  }

  ngOnDestroy(): void {
    this.onMessageSubscription?.unsubscribe();
  }
}
