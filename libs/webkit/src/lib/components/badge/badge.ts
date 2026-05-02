import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'lib-badge',
  imports: [],
  templateUrl: './badge.html',
  styleUrl: './badge.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
  icon = input.required<string>();
  label = input.required<string>();
}
