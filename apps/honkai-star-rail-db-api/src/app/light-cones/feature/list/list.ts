import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-list-component',
  imports: [],
  templateUrl: './list.html',
  styleUrl: './list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {}
