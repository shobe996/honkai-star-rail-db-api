import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'lib-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  rarityValue = input.required<number | string>(); 
  image = input.required<string>();
  name = input.required<string>();
  starIcon = input<string>('');

  imageClick = output<void>();
  nameClick = output<void>();
}
