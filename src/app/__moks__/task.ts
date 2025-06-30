import { Task } from '../features/tasks/model/task.model';

export const tasks: Task[] = [
    {
        id: '1',
        title: 'Ir a academia',
        isCompleted: false,
        categoryId: '5'
    },
    {
        id: '2',
        title: 'Comprar pão',
        isCompleted: true,
        categoryId: '1'
    },
    {
        id: '3',
        title: 'aprender Angular',
        isCompleted: false,
        categoryId: '2'
    }
];

export const task: Task = {
    id: '4',
    title: 'Estudar PCP PROTHEUS',
    isCompleted: false,
    categoryId: '3'
};

export const TASK_INTERNAL_SERVER_ERROR_RESPONSE: {
    status: number;
    statusText: string;
} = {
    status: 500,
    statusText: 'Internal Server Error',
};

export const TASK_UNPROCESSABLE_ENTITY_RESPONSE: {
    status: number;
    statusText: string;
} = {
    status: 422,
    statusText: 'Unprocessable Entity',
};

export const TASK_NOT_FOUND_RESPONSE: {
    status: number;
    statusText: string;
} = {
    status: 404,
    statusText: 'Not Found',
};