import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Task } from '../model/task.model';
import { environment } from '../../../../environments/environment.prod';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  private readonly httpClient = inject(HttpClient);

  public tasks = signal<Task[]>([]);

  public numberOfTasks = computed(() => this.tasks().length);

  public readonly apiUrl = environment.apiUrl;

  public getTasks(): Observable<Task[]>{
    return this.httpClient.get<Task[]>(`${this.apiUrl}/tasks`).pipe(
      tap(tasks =>{
        const sortedTasks = this.getSortedTasks(tasks);
        this.tasks.set(sortedTasks);
      })
    );
  }

  public getSortedTasks(tasks: Task[]): Task[] {

    return tasks.sort((a, b) => a.title.localeCompare(b.title));

  }


}
