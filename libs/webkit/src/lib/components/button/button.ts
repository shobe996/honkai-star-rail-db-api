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

  // Variant for the button component
  variant = input<'primary' | 'secondary' | 'reset' | 'nav' | 'round'>('primary');

  // Disabled state for the button component
  disabled = input<boolean>(false);

  // Type of the button element
  type = input<'button' | 'submit' | 'reset'>('button');

  // Active state for the button component
  active = input<boolean>(false);

  // Edge display state for the button component
  isEdge = input<boolean>(false);
}
