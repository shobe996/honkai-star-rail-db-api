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

  labelKey = input<keyof T>();
  valueKey = input<keyof T>();

  disabled = input<boolean>(false);
  value = model<V>('' as unknown as V);

  readonly selectId = `hsr-select-${Math.random().toString(36).substring(2, 9)}`;

  onSelectionChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.value.set(selectElement.value as unknown as V);
  }

  getOptionLabel(opt: T): string {
    const key = this.labelKey();
    return key ? String(opt[key]) : '';
  }

  getOptionValue(opt: T): V {
    const key = this.valueKey();
    return key ? (opt[key] as unknown as V) : ('' as unknown as V);
  }
}
