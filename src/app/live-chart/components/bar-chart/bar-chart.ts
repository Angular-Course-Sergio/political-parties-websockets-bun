import { Component, ElementRef, input, OnDestroy, OnInit, viewChild } from '@angular/core';
import { Chart, ChartData } from 'chart.js';

@Component({
  selector: 'bar-chart',
  imports: [],
  templateUrl: './bar-chart.html',
})
export class BarChart implements OnInit, OnDestroy {
  private readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('chart');
  private chartInstance: Chart | null = null;
  public chartData = input.required<ChartData<'bar'>>();

  ngOnInit(): void {
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas) throw new Error('Canvas element not found');

    this.chartInstance = new Chart(canvas, {
      type: 'bar',
      data: this.chartData(),
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  ngOnDestroy(): void {
    this.chartInstance?.destroy();
  }
}
