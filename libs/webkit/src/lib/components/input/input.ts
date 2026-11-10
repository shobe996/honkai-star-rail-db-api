import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

/**
 * Input component for handling text input with label, placeholder, and type
 * @label The label for the input field
 * @placeholder The placeholder text for the input field
 * @type The type of the input field (e.g., 'text', 'password')
 * @default text
 * @disabled The disabled state of the input field
 * @default false
 */
@Component({
  selector: 'lib-input',
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements FormValueControl<string> {

  // Label for the input field
  label = input<string>('');

  // Placeholder text for the input field
  placeholder = input<string>('');

  // Input type for the field
  type = input<string>('text');

  // Disabled state of the input field
  disabled = input<boolean>(false);

  // Value of the input field
  value = model<string>('');

  // Unique ID for the input element
  readonly inputId = `hsr-input-${Math.random().toString(36).substring(2, 9)}`;

  // Handle input event and update the value model
  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);
  }
}
