import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

/**
 * Card component for displaying character or item information.
 * @rarityValue The rarity value of the card (number or string)
 * @image The image URL for the card
 * @name The name of the card
 * @starIcon The star icon for the card (optional)
 */
@Component({
  selector: 'lib-card',
  imports: [],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {

  // Rarity input for the card component
  rarityValue = input.required<number | string>(); 

  // Image and name inputs for the card component
  image = input.required<string>();

  // Name input for the card component
  name = input.required<string>();

  // Star icon input for the card component
  starIcon = input<string>('');

  // Click event outputs for the card component
  imageClick = output<void>();

  // Click event output for the name element
  nameClick = output<void>();
}
