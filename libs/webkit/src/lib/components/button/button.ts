import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Button component to display a clickable button with various styles.
 * @variant 'primary' | 'secondary' | 'reset' | 'nav' | 'round'
 * @default 'primary'
 * @disabled Whether the button is disabled.
 * @type The type of the button element.
 * @default 'button'
 * @active Whether the button is in an active state.
 * @isEdge Whether the button is displayed on the edge.
 */
@Component({
  selector: 'lib-button',
  imports: [NgClass],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  /** The variant of the button component.
   * @default 'primary'
   */
  variant = input<'primary' | 'secondary' | 'reset' | 'nav' | 'round'>(
    'primary',
  );

  /** Whether the button is disabled. */
  disabled = input<boolean>(false);

  /** The type of the button element.
   * @default 'button'
   */
  type = input<'button' | 'submit' | 'reset'>('button');

  /** Whether the button is in an active state. */
  active = input<boolean>(false);

  /** Whether the button is displayed on the edge. */
  isEdge = input<boolean>(false);
}
