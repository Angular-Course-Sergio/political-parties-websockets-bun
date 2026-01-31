import { Component, input } from '@angular/core';

@Component({
  selector: 'chart-form-row',
  imports: [],
  templateUrl: './chart-form-row.html',
  styleUrls: ['./chart-form-row.css'],
})
export class ChartFormRow {
  label = input.required<string>();
  cssClasses = input.required<string>();
  votes = input.required<string>();
}
