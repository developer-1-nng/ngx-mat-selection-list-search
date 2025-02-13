import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-no-records-found',
  templateUrl: './custom-no-records-found.component.html',
  styleUrls: ['./custom-no-records-found.component.scss']
})
export class CustomNoRecordsFoundComponent {
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
}
