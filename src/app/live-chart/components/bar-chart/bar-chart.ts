import { Component, ElementRef, OnInit, viewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'bar-chart',
  imports: [],
  templateUrl: './bar-chart.html',
})
export class BarChart implements OnInit {
  private readonly canvasRef = viewChild<ElementRef<HTMLCanvasElement>>('chart');

  ngOnInit(): void {
    const canvas = this.canvasRef()?.nativeElement;
    if (!canvas) throw new Error('Canvas element not found');

    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            backgroundColor: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }
}
