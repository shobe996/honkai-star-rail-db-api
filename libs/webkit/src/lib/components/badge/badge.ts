import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'lib-badge',
  imports: [],
  templateUrl: './badge.html',
  styleUrl: './badge.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {
  icon = input.required<string | undefined>();
  label = input.required<string | undefined>();

  variant = input<'mini' | 'detail'>('mini');
}
