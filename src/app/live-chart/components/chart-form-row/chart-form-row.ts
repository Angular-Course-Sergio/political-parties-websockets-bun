import { Component, input, output } from '@angular/core';
import { Party } from '../../../types';

@Component({
  selector: 'chart-form-row',
  imports: [],
  templateUrl: './chart-form-row.html',
  styleUrls: ['./chart-form-row.css'],
})
export class ChartFormRow {
  public party = input.required<Party>();

  incrementVotes = output<Party>();
  decrementVotes = output<Party>();
  deleteParty = output<Party>();
  updateParty = output<Party>();

  private updatePartyTimeout: number | null = null;

  updatePartyName(name: string): void {
    if (this.updatePartyTimeout) {
      clearInterval(this.updatePartyTimeout);
    }

    this.updatePartyTimeout = setTimeout(() => {
      console.log('Emitting updateParty for', name);
      this.updateParty.emit({
        ...this.party(),
        name,
      });
    }, 500);
  }
}
