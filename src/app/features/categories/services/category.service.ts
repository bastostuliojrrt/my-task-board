import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Category } from '../model/category.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  // Como será trabalho com inject, o constructor não será necessário

  // Variável para armazenar a URL da API, que será utilizada para fazer as requisições
  private readonly apiUrl = environment.apiUrl;

  // Variável para armazenar a instância do HttpClient, que será utilizada para fazer as requisições
  private readonly httpClient = inject(HttpClient);  

  // Variável para armazenar a lista de categorias, que será utilizada para armazenar os dados retornados pela API
  public categories = signal<Category[]>([]);

  // Método para buscar as categorias da API e armazená-las na variável categories
  public getCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(`${this.apiUrl}/categories`).pipe(tap((categories) => this.categories.set(categories)));
  }

}
