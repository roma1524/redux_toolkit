import type {TasksState} from '../app/App.tsx'
import {
    createTodolistAC,
    deleteTodolistAC,
} from './todolists-reducer'
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";


const initialState: TasksState = {}

// export const deleteTaskAC = (payload: { todolistId: string, taskId: string }) => {
//     return {type: 'delete_task', payload} as const
// }

export const deleteTaskAC = createAction<{taskId: string, todolistId: string}>('tasks/deleteTask');

export const createTaskAC = createAction<{todolistId: string, title: string}>('tasks/createTask')

export const changeTaskStatusAC = createAction<{ todolistId: string, taskId: string, isDone: boolean }>('tasks/changeTaskStatus')

export const changeTaskTitleAC = createAction<{ todolistId: string, taskId: string, title: string }>('tasks/changeTaskTitle')


export const tasksReducer = createReducer(initialState, builder => {
    builder.addCase(deleteTodolistAC, (state, action) => {
        delete state[action.payload.id]
    })
        .addCase(createTodolistAC, (state, action) => {
            state[action.payload.id] = []
        })
        .addCase(deleteTaskAC, (state, action) => {
          const indexValue = state[action.payload.todolistId].findIndex(item => item.id === action.payload.taskId)
            if (indexValue !== -1) {
                state[action.payload.todolistId].splice(indexValue, 1)
            }
        })
        .addCase(createTaskAC, (state, action) => {
            state[action.payload.todolistId].push({title: action.payload.title, isDone: false, id: nanoid()})
        })
        .addCase(changeTaskStatusAC, (state, action) => {
            const indexValue = state[action.payload.todolistId].findIndex(item => item.id === action.payload.taskId)
            if (indexValue !== -1) {
                state[action.payload.todolistId][indexValue].isDone = action.payload.isDone
            }
        })
        .addCase(changeTaskTitleAC, (state, action) => {
            const indexValue = state[action.payload.todolistId].findIndex(item => item.id === action.payload.taskId)
            if (indexValue !== -1) {
                state[action.payload.todolistId][indexValue].title = action.payload.title
            }
        })
})


// export const createTaskAC = (payload: { todolistId: string, title: string }) => {
//     return {type: 'create_task', payload} as const
// }

// export const changeTaskStatusAC = (payload: { todolistId: string, taskId: string, isDone: boolean }) => {
//     return {type: 'change_task_status', payload} as const
// }

// export const changeTaskTitleAC = (payload: { todolistId: string, taskId: string, title: string }) => {
//     return {type: 'change_task_title', payload} as const
// }

// export const tasksReducer = (state: TasksState = initialState, action: Actions): TasksState => {
//     switch (action.type) {
//         case 'delete_task': {
//             return {
//                 ...state,
//                 [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
//             }
//         }
//         case 'create_task': {
//             const newTask: Task = {title: action.payload.title, isDone: false, id: v1()}
//             return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
//         }
//         case "change_task_status": {
//             return {
//                 ...state,
//                 [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {
//                     ...task,
//                     isDone: action.payload.isDone
//                 } : task)
//             }
//         }
//         case "change_task_title": {
//             return {
//                 ...state,
//                 [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId ? {
//                     ...task,
//                     title: action.payload.title
//                 } : task)
//             }
//         }
//         default:
//             return state
//     }
// }



// export type DeleteTaskAction = ReturnType<typeof deleteTaskAC>
// export type CreateTaskAction = ReturnType<typeof createTaskAC>
// export type ChangeTaskStatusAction = ReturnType<typeof changeTaskStatusAC>
// export type ChangeTaskTitleAction = ReturnType<typeof changeTaskTitleAC>

// type Actions =
//     // | DeleteTaskAction
//     | CreateTaskAction
//     | ChangeTaskStatusAction
//     | ChangeTaskTitleAction
// | CreateTodolistAction
// | DeleteTodolistAction
