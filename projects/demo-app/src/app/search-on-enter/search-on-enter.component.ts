import { Component } from '@angular/core';

@Component({
  selector: 'app-search-on-enter',
  templateUrl: './search-on-enter.component.html',
  styleUrls: ['./search-on-enter.component.scss']
})
export class SearchOnEnterComponent {
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
}
