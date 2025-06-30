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