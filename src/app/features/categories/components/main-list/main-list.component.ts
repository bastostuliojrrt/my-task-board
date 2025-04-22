import { Component, inject } from '@angular/core';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-main-list',
  standalone: true,
  imports: [],
  templateUrl: './main-list.component.html',
  styles: ''
})
export class MainListComponent {

  // Chamando o serviço CategoryService, que é responsável por gerenciar as categorias
  private readonly categoryService = inject(CategoryService);

  // 
  public categories = this.categoryService.categories;


}
