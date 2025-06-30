import { TestBed, waitForAsync } from '@angular/core/testing';
import { TaskService } from './task.service';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { task, TASK_INTERNAL_SERVER_ERROR_RESPONSE, tasks } from '../../../__moks__/task';
import { environment } from '../../../../environments/environment.prod';
import { Task } from '../model/task.model';
import { response } from 'express';
import { error } from 'console';

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
      taskService.getTasks().subscribe(response => {
        expect(response).toEqual(MOCKED_TASKS);
        expect(taskService.tasks()).toEqual(MOCKED_TASKS);
      })

      const req = httpTestingController.expectOne(`${baseUrl}/tasks`);

      // Simula o envio da lista de tarefas
      req.flush(MOCKED_TASKS);

      expect(req.request.method).toBe('GET');

    }));

    it('should throw and erro when server returns Internal Server Error', waitForAsync(() => {

      let httpErrorResponse: HttpErrorResponse | undefined;

      taskService.getTasks().subscribe({
        next: () => {
          fail('failed to fetch the tasks list');
        },
        error: (error: HttpErrorResponse) => {
          httpErrorResponse = error;
        }
      });

      const req = httpTestingController.expectOne(`${baseUrl}/tasks`);

      // Simula o envio de um erro do servidor
      req.flush('Internal Server Error', TASK_INTERNAL_SERVER_ERROR_RESPONSE);

      if (!httpErrorResponse) {
        throw new Error('Error response is undefined');
      }

      expect(httpErrorResponse.status).toEqual(500);
      expect(httpErrorResponse.statusText).toEqual('Internal Server Error');
    }));

  });


  describe('createTask', () => {

    it('should create a new task with waitForAsync', waitForAsync(() => {

      taskService.createTask(MOCKED_TASK).subscribe(response => {
        expect(taskService.tasks().length).toEqual(1);
        expect(taskService.tasks()[0]).toEqual(MOCKED_TASK);
      })

      const req = httpTestingController.expectOne(`${baseUrl}/tasks`);

      // Simula o envio da lista de tarefas
      req.flush(MOCKED_TASK);

      expect(req.request.method).toBe('POST');

    }));

    it('should create a new task without awaitForAsync', () => {

      let task: Task | undefined;
      
      taskService.createTask(MOCKED_TASK).subscribe(response => {
        task = response;
      })

      const req = httpTestingController.expectOne(`${baseUrl}/tasks`);

      // Simula o envio da lista de tarefas
      req.flush(MOCKED_TASK);

      expect(task).toEqual(MOCKED_TASK);
      expect(taskService.tasks().length).toEqual(1);
      expect(taskService.tasks()[0]).toEqual(MOCKED_TASK);

      expect(req.request.method).toBe('POST');
    });

  });



});
