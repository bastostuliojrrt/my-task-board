import { TestBed, waitForAsync } from '@angular/core/testing';
import { TaskService } from './task.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { task, tasks } from '../../../__moks__/task';
import { environment } from '../../../../environments/environment.prod';
import { Task } from '../model/task.model';

describe('TaskService', () => {
  let taskService: TaskService;
  let httpTestingController: HttpTestingController;

  const baseUrl = environment.apiUrl;

  const MOCKED_TASKS = tasks;
  const MOCKED_TASK = task;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    taskService = TestBed.inject(TaskService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(taskService).toBeTruthy();
  });

  it('getSortedTasks', () => {

    const sortedTasks = taskService.getSortedTasks(MOCKED_TASKS);
    expect(sortedTasks[0].title).toBe('aprender Angular')

  })

  describe('getTasks', () => {

    it('should return a list of tasks', waitForAsync(() => {

      let tasks!: Task[] | undefined;
      taskService.getTasks().subscribe(response => {tasks = response;})
      
      const req = httpTestingController.expectOne(`${baseUrl}/tasks`);

      // Simula o envio da lista de tarefas
      req.flush(MOCKED_TASKS);

      expect(tasks).toEqual(MOCKED_TASKS);
      expect(taskService.tasks()).toEqual(MOCKED_TASKS);

      expect(req.request.method).toBe('GET');

    }))

  })

});
