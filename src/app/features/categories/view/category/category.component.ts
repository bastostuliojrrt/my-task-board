import { Component, inject } from '@angular/core';
import { MainListComponent } from '../../components/main-list/main-list.component';
import { ColorsListComponent } from '../../components/colors-list/colors-list.component';
import { CategoryService } from '../../services/category.service';
import { AsyncPipe } from '@angular/common';

const COMPONENTS = [MainListComponent,ColorsListComponent];

const PIPES = [AsyncPipe];

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [...COMPONENTS, ...PIPES],
  templateUrl: './category.component.html',
  styles: ''
})
export class CategoryComponent {

    // Injetando a dependência CategoryService, que será utilizada para fazer as requisições à API 
    private readonly categoryService = inject(CategoryService);

    // Chamando o método getCategories do CategoryService, que retorna um Observable<Category[]>, e armazenando o resultado na variável categories$
    public categories$ = this.categoryService.getCategories();


    // ---------------------- SUBSCRIBE ----------------------

    // Variável para armazenar a lista de categorias, que será utilizada para armazenar os dados retornados pela API
    // public categories$ = [];

    // // Método chamar a lista de categorias usando o subscribe
    // public listCategories(){
    //     this.categoryService.getCategories().subscribe({
    //         next: (categories: any) => {
    //           this.categories$ = categories;
    //           console.log(categories);
    //         },
    //         error: (error: any) => {
    //             console.error(error);
    //         }
    //     });
    // }

    // ngOnInit() {

    //     // Chamando o método listCategories para listar as categorias
    //     this.listCategories();

    // }

    // -----------------------------------------------------------

}
