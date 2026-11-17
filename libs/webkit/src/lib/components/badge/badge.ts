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
  /** The icon to display in the badge. */
  icon = input.required<string | undefined>();

  /** The label to display next to the icon. */
  label = input.required<string | undefined>();

  /** The variant of the badge component.
   * @default 'mini'
   */
  variant = input<'mini' | 'detail'>('mini');
}
