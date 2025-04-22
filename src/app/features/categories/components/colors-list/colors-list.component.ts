import { Component, inject } from '@angular/core';
import { MatDividerModule } from '@angular/material/divider';
import { CategoryService } from '../../services/category.service';
import { categoryColorsBackground } from '../../constants/category-colors';

const MODULES = [MatDividerModule];

@Component({
  selector: 'app-colors-list',
  standalone: true,
  imports: [...MODULES],
  templateUrl: './colors-list.component.html',
  styles: ''
})
export class ColorsListComponent {

  private readonly categoryService = inject(CategoryService);

  public categories = this.categoryService.categories;

  public categoryColorsBackground = categoryColorsBackground

}
