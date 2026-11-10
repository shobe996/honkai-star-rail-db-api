import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Badge component to display an icon with a label.
 * @variant 'mini' | 'detail'
 * @icon The icon to display in the badge.
 * @label The label to display next to the icon.
 * @default 'mini'
 */
@Component({
  selector: 'lib-badge',
  imports: [],
  templateUrl: './badge.html',
  styleUrl: './badge.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BadgeComponent {

  // Icon for the badge component
  icon = input.required<string | undefined>();

  // Label for the badge component
  label = input.required<string | undefined>();

  // Variant for the badge component
  variant = input<'mini' | 'detail'>('mini');
}
