import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

/**
 * Select component for choosing an option from a list.
 * @label The label for the select component.
 * @options The list of options to display.
 * @labelKey The key to use for the option labels (optional).
 * @valueKey The key to use for the option values (optional).
 * @disabled Whether the select is disabled.
 * @default false
 */
@Component({
  selector: 'lib-select',
  imports: [],
  templateUrl: './select.html',
  styleUrl: './select.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent <T extends object, V extends string | number> implements FormValueControl<V>{

  // Label for the select component
  label = input<string>('');

  // List of options to display
  options = input<T[]>([]);

  // These become optional. If not provided, we use the raw value of T.
  labelKey = input<keyof T | undefined>();

  // Key to use for the option labels (optional)
  valueKey = input<keyof T | undefined>();

  // Key to use for the option values (optional)
  disabled = input<boolean>(false);

  // Model for the selected value
  value = model<V>('' as unknown as V);

  // Unique ID for the select element
  readonly selectId = `hsr-select-${Math.random().toString(36).substring(2, 9)}`;

  // Handle selection changes from the HTML select element
  onSelectionChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.value.set(selectElement.value as unknown as V);
  }

  // Get the display label for an option
  getOptionLabel(opt: T): string {
    const key = this.labelKey();
    if (key && typeof opt === 'object' && opt !== null) {
      return String(opt[key]);
    }
    return String(opt);
  }

  // Get the value for an option
  getOptionValue(opt: T): V {
    const key = this.valueKey();
    if (key && typeof opt === 'object' && opt !== null) {
      return opt[key] as unknown as V;
    }
    return opt as unknown as V;
  }
}
