import { Component } from '@angular/core';

@Component({
  selector: 'app-select-clear-all-option',
  templateUrl: './select-clear-all-option.component.html',
  styleUrls: ['./select-clear-all-option.component.scss']
})
export class SelectClearAllOptionComponent {
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
}
