import { Component, input } from '@angular/core';
import { ChartFormRow } from '../chart-form-row/chart-form-row';
import { Party } from '../../../types';

@Component({
  selector: 'chart-form',
  imports: [ChartFormRow],
  templateUrl: './chart-form.html',
  styleUrls: ['./chart-form.css'],
})
export class ChartForm {
  public parties = input.required<Party[]>();
}
