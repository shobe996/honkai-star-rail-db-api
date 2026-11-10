import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

/**
 * Navigation item interface for defining individual nav links.
 */
export interface NavItem {

  /** The display label for the navigation item */
  label: string;

  /** The URL or router link for the navigation item */
  link: string;
  
  /** Optional icon for the navigation item */
  icon?: string;
}

// Defines the orientation type for the navbar component
export type NavbarOrientation = 'horizontal' | 'vertical';

/**
 * Navbar component for rendering navigation links with optional logo.
 * @orientation The layout direction of the navbar ('horizontal' or 'vertical')
 * @default 'horizontal'
 * @items The list of navigation items to display
 * @logoUrl Optional logo image URL
 */
@Component({
  selector: 'lib-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  
  // Orientation of the navbar ('horizontal' or 'vertical')
  orientation = input<NavbarOrientation>('horizontal');

  // List of nav links to render
  items = input<NavItem[]>([]);

  // Optional logo image URL
  logoUrl = input<string>();
}
