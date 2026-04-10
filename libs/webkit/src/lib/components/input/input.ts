import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

@Component({
  selector: 'lib-input',
  imports: [],
  templateUrl: './input.html',
  styleUrl: './input.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements FormValueControl<string> {
  label = input<string>('');
  placeholder = input<string>('');
  type = input<string>('text');

  value = model<string>('');

  disabled = input<boolean>(false);

  readonly inputId = `hsr-input-${Math.random().toString(36).substring(2, 9)}`;

  handleInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value.set(target.value);
  }
}
