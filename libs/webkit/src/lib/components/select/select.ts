import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

@Component({
  selector: 'lib-select',
  imports: [],
  templateUrl: './select.html',
  styleUrl: './select.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent <T extends object, V extends string | number> implements FormValueControl<V>{
  label = input<string>('');
  options = input<T[]>([]);

  // These become optional. If not provided, we use the raw value of T.
  labelKey = input<keyof T | undefined>();
  valueKey = input<keyof T | undefined>();

  disabled = input<boolean>(false);
  value = model<V>('' as unknown as V);

  readonly selectId = `hsr-select-${Math.random().toString(36).substring(2, 9)}`;

  onSelectionChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    // We cast the string value from the HTMLSelectElement back to V
    this.value.set(selectElement.value as unknown as V);
  }

  getOptionLabel(opt: T): string {
    const key = this.labelKey();
    // If T is an object and key exists, return the property. 
    // Otherwise, stringify the primitive.
    if (key && typeof opt === 'object' && opt !== null) {
      return String(opt[key]);
    }
    return String(opt);
  }

  getOptionValue(opt: T): V {
    const key = this.valueKey();
    if (key && typeof opt === 'object' && opt !== null) {
      return opt[key] as unknown as V;
    }
    return opt as unknown as V;
  }
}
