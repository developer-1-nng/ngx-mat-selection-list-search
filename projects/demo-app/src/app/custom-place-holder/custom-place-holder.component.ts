import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-place-holder',
  templateUrl: './custom-place-holder.component.html',
  styleUrls: ['./custom-place-holder.component.scss']
})
export class CustomPlaceHolderComponent {
  placeholder:string = "";
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  CustomPlaceHolder: string =  "Search";
}
