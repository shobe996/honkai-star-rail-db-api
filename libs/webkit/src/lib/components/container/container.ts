import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'lib-container',
  imports: [],
  templateUrl: './container.html',
  styleUrl: './container.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContainerComponent {
  glassy = input<boolean>(true);
}
