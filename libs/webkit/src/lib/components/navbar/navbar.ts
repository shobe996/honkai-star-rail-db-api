import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

export interface NavItem {
  label: string;
  link: string;
  icon?: string;
}

export type NavbarOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'lib-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  /** Determines layout direction: 'horizontal' (top) or 'vertical' (left side) */
  orientation = input<NavbarOrientation>('horizontal');

  /** List of nav links to render */
  items = input<NavItem[]>([]);

  /** Optional logo image URL */
  logoUrl = input<string>();
}
