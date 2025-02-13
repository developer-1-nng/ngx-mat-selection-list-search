import { Component } from '@angular/core';
import { MatFormFieldAppearance } from '@angular/material/form-field';

@Component({
  selector: 'app-dynamic-mat-form-field-appearance',
  templateUrl: './dynamic-mat-form-field-appearance.component.html',
  styleUrls: ['./dynamic-mat-form-field-appearance.component.scss']
})
export class DynamicMatFormFieldAppearanceComponent {
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  appearance : MatFormFieldAppearance = 'fill'
}
