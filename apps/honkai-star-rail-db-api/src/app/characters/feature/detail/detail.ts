import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-detail-component',
  imports: [],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent {}
