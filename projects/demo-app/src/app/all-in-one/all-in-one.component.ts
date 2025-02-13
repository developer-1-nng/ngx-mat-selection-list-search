import { Component } from '@angular/core';

@Component({
  selector: 'app-all-in-one',
  templateUrl: './all-in-one.component.html',
  styleUrls: ['./all-in-one.component.scss']
})
export class AllInOneComponent {
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
}
