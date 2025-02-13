import { Component } from '@angular/core';

@Component({
  selector: 'app-loader-on-search',
  templateUrl: './loader-on-search.component.html',
  styleUrls: ['./loader-on-search.component.scss']
})
export class LoaderOnSearchComponent {
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  debounceTime = 1000;
}
