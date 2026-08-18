import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'lib-button',
  imports: [NgClass],
  templateUrl: './button.html',
  styleUrl: './button.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  variant = input<'primary' | 'secondary' | 'reset' | 'nav' | 'round'>('primary');
  disabled = input<boolean>(false);
  type = input<'button' | 'submit' | 'reset'>('button');
  active = input<boolean>(false);

  isEdge = input<boolean>(false);
}
