import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Container component for wrapping content with optional glassy effect
 * @glassy Input property to enable or disable the glassy effect
 */
@Component({
  selector: 'lib-container',
  imports: [],
  templateUrl: './container.html',
  styleUrl: './container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerComponent {

  // Input property to enable or disable the glassy effect
  glassy = input<boolean>(true);
}
