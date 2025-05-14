import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Category } from '../model/category.model';
import { Observable, tap } from 'rxjs';
// import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  // Como será trabalho com inject, o constructor não será necessário

  // Variável para armazenar a URL da API, que será utilizada para fazer as requisições
  private readonly apiUrl = environment.apiUrl;

  // Variável para armazenar a instância do HttpClient, que será utilizada para fazer as requisições
  private readonly httpClient = inject(HttpClient);  

  // private readonly categories$ = this.httpClient.get<Category[]>(`${this.apiUrl}/categories`)

  // Variável para armazenar a lista de categorias, que será utilizada para armazenar os dados retornados pela API
  public categories = signal<Category[]>([]);

  // Usando o toSignal para quando temos uma lista imutável, ou seja, não vamos alterar os dados da lista
  // public categories = toSignal(this.categories$, { initialValue: [] as Category[] });


  // Método para buscar as categorias da API e armazená-las na variável categories
  public getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.apiUrl}/categories`).pipe(tap((categories) => this.categories.set(categories)));
  }

}
