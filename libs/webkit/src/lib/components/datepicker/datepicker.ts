import { DatePipe } from '@angular/common';
import {
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  input,
  model,
  signal,
} from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

// Type for the datepicker mode, either single date selection or date range selection.
type DatepickerMode = 'single' | 'range';

/** Type for representing a date range as a tuple with start and end dates. */
export type DateRangeArray = [Date | null, Date | null];

// Type for the value of the datepicker, which can be a single date, a date range, or null.
type DatepickerValue = Date | DateRangeArray | null;

// Interface for representing a day in the calendar view.
interface CalendarDay {
  // The date represented by this calendar day.
  date: Date;

  // The day number within the month.
  dayNumber: number;

  // Whether this day belongs to the current month being displayed.
  isCurrentMonth: boolean;

  // Whether this day is today.
  isToday: boolean;

  // Whether this day is selected.
  isSelected: boolean;

  // Whether this day is the start of a selected range.
  isRangeStart: boolean;

  // Whether this day is the end of a selected range.
  isRangeEnd: boolean;

  // Whether this day is within a selected range.
  isInRange: boolean;

  // Whether this day is disabled.
  isDisabled: boolean;
}

/**
 * Datepicker Component
 * @disabled Whether the datepicker is disabled.
 * @mode The mode of the datepicker, either 'single' or 'range'.
 * @placeholder The placeholder text for the input.
 * @minDate The minimum selectable date.
 * @maxDate The maximum selectable date.
 */
@Component({
  selector: 'lib-datepicker',
  imports: [DatePipe],
  templateUrl: './datepicker.html',
  styleUrl: './datepicker.scss',
})
export class DatepickerComponent implements FormValueControl<DatepickerValue> {

  // Element reference for the datepicker component.
  private _elementRef = inject(ElementRef);

  /**
   * The mode of the datepicker, either 'single' or 'range'.
   * @default 'single'
   */
  mode = input<DatepickerMode>('single');

  /**
   * Timezone for the model value and date bounds. Use 'utc' for date-only
   * values stored at UTC midnight, such as `new Date('2023-04-26')`.
   * @default 'local'
   */
  valueTimezone = input<'local' | 'utc'>('local');

  /**
   * The placeholder text for the input.
   * @default 'Select date...'
   */
  placeholder = input<string>('Select date...');

  /**
   * The minimum selectable date.
   * @default null
   */
  minDate = input<Date | null>(null);

  /**
   * The maximum selectable date.
   * @default null
   */
  maxDate = input<Date | null>(null);

  /**
   * Whether the datepicker is disabled.
   * @default false
   */
  disabled = input<boolean>(false);

  /** FormValueControl Model Signal */
  value = model<DatepickerValue>(null);

  // Computed calendar value based on the current value and timezone.
  private readonly _calendarValue = computed<DatepickerValue>(() => {
    const value = this.value();
    if (this.valueTimezone() === 'local') return value;
    if (Array.isArray(value)) {
      return [this._toCalendarDate(value[0]), this._toCalendarDate(value[1])];
    }
    return this._toCalendarDate(value);
  });

  /**
   * Whether the datepicker dropdown is open.
   */
  isOpen = signal<boolean>(false);

  /**
   * The currently viewed month in the calendar.
   */
  viewDate = signal<Date>(new Date());

  /**
   * The date currently being hovered over in the calendar.
   */
  hoveredDate = signal<Date | null>(null);

  /**
   * The days of the week, used for rendering the calendar header.
   */
  readonly weekDays = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

  /**
   * The display value for the trigger input, formatted based on the selected date(s).
   */
  displayValue = computed(() => {
    const val = this._calendarValue();
    if (this.mode() === 'single') {
      const date = val instanceof Date ? val : null;
      return date ? this._formatDate(date) : '';
    } else {
      const [start, end] = Array.isArray(val) ? val : [];
      if (start && end)
        return `${this._formatDate(start)} — ${this._formatDate(end)}`;
      if (start) return `${this._formatDate(start)} — ...`;
      return '';
    }
  });

  /**
   * Computed 42-day Calendar Grid (6 weeks)
   */
  calendarDays = computed<CalendarDay[]>(() => {
    const view = this.viewDate();
    const year = view.getFullYear();
    const month = view.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const startDayOfWeek = firstDayOfMonth.getDay();

    const days: CalendarDay[] = [];
    const today = this._normalizeDate(new Date());
    const currentCursor = new Date(year, month, 1 - startDayOfWeek);

    for (let i = 0; i < 42; i++) {
      const date = this._normalizeDate(new Date(currentCursor));
      const isCurrentMonth = date.getMonth() === month;

      days.push({
        date,
        dayNumber: date.getDate(),
        isCurrentMonth,
        isToday: this._isSameDay(date, today),
        isSelected: this._checkIsSelected(date),
        isRangeStart: this._checkIsRangeStart(date),
        isRangeEnd: this._checkIsRangeEnd(date),
        isInRange: this._checkIsInRange(date),
        isDisabled: this._checkIsDisabled(date),
      });

      currentCursor.setDate(currentCursor.getDate() + 1);
    }

    return days;
  });

  /**
   * Handles clicks outside the datepicker to close the dropdown.
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this._elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  /**
   * Toggles the visibility of the datepicker dropdown.
   */
  toggleDropdown(): void {
    if (this.disabled()) return;

    const nextState = !this.isOpen();
    this.isOpen.set(nextState);

    if (nextState) {
      const val = this._calendarValue();
      let target: Date | null = null;
      if (this.mode() === 'single' && val instanceof Date) {
        target = val;
      } else if (this.mode() === 'range' && Array.isArray(val)) {
        target = val[0];
      }

      if (target) {
        this.viewDate.set(new Date(target.getFullYear(), target.getMonth(), 1));
      }
    }
  }

  /**
   * Navigates to the previous month in the calendar view.
   */
  prevMonth(event: Event): void {
    event.stopPropagation();
    this.viewDate.update((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  }

  /**
   * Navigates to the next month in the calendar view.
   */
  nextMonth(event: Event): void {
    event.stopPropagation();
    this.viewDate.update((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));
  }

  /**
   * Handles the selection of a day in the calendar.
   */
  selectDay(day: CalendarDay, event: Event): void {
    event.stopPropagation();
    if (day.isDisabled || this.disabled()) return;

    const selected = this._toModelDate(day.date);
    if (this.mode() === 'single') {
      this.value.set(selected);
      this.isOpen.set(false);
    } else {
      const current = this._calendarValue();
      const [start, end] = Array.isArray(current) ? current : [];

      if (!start || end) {
        this.value.set([selected, null]);
      } else {
        const modelStart = this._toModelDate(start);
        this.value.set(
          day.date < start ? [selected, modelStart] : [modelStart, selected],
        );
        this.isOpen.set(false);
      }
    }
  }

  /**
   * Handles hovering over a day in the calendar (for range selection).
   */
  onDayHover(day: CalendarDay): void {
    if (this.mode() === 'range' && !day.isDisabled) {
      this.hoveredDate.set(day.date);
    }
  }

  /**
   * Clears the current date selection.
   */
  clearSelection(event: Event): void {
    event.stopPropagation();
    if (this.disabled()) return;

    if (this.mode() === 'single') {
      this.value.set(null);
    } else {
      this.value.set([null, null]);
    }
  }

  // Normalizes a date to remove the time component.
  private _normalizeDate(d: Date): Date {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  // Keep the grid in local time while preserving the model's calendar day.
  private _toCalendarDate(date: Date | null): Date | null {
    if (!date) return null;
    return this.valueTimezone() === 'utc'
      ? new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
      : this._normalizeDate(date);
  }

  private _toModelDate(date: Date): Date {
    return this.valueTimezone() === 'utc'
      ? new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
      : date;
  }

  // Checks if two dates are the same day.
  private _isSameDay(a: Date | null, b: Date | null): boolean {
    if (!a || !b) return false;
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  // Formats a date as a string in the format YYYY-MM-DD.
  private _formatDate(d: Date): string {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  }

  // Checks if a date is selected.
  private _checkIsSelected(date: Date): boolean {
    const val = this._calendarValue();
    if (this.mode() === 'single') {
      return this._isSameDay(date, val instanceof Date ? val : null);
    }
    return (
      Array.isArray(val) &&
      (this._isSameDay(date, val[0]) || this._isSameDay(date, val[1]))
    );
  }

  // Checks if a date is the start of the selected range.
  private _checkIsRangeStart(date: Date): boolean {
    if (this.mode() !== 'range') return false;
    const val = this._calendarValue();
    const [start, end] = Array.isArray(val) ? val : [null, null];
    const hover = this.hoveredDate();

    if (start && !end && hover && hover < start) {
      return this._isSameDay(date, hover);
    }
    return this._isSameDay(date, start);
  }

  // Checks if a date is the end of the selected range.
  private _checkIsRangeEnd(date: Date): boolean {
    if (this.mode() !== 'range') return false;
    const val = this._calendarValue();
    const [start, end] = Array.isArray(val) ? val : [null, null];
    const hover = this.hoveredDate();

    if (start && !end && hover) {
      return hover >= start
        ? this._isSameDay(date, hover)
        : this._isSameDay(date, start);
    }
    return this._isSameDay(date, end);
  }

  // Checks if a date is within the selected range.
  private _checkIsInRange(date: Date): boolean {
    if (this.mode() !== 'range') return false;
    const val = this._calendarValue();
    const [start, end] = Array.isArray(val) ? val : [];
    if (!start) return false;

    const effectiveEnd = end ?? this.hoveredDate();
    if (!effectiveEnd) return false;

    const min = start < effectiveEnd ? start : effectiveEnd;
    const max = start < effectiveEnd ? effectiveEnd : start;

    return date > min && date < max;
  }

  // Checks if a date is disabled based on the min and max date constraints.
  private _checkIsDisabled(date: Date): boolean {
    const min = this._toCalendarDate(this.minDate());
    const max = this._toCalendarDate(this.maxDate());
    if (min && date < min) return true;
    if (max && date > max) return true;
    return false;
  }
}
