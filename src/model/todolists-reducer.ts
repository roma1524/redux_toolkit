import type {FilterValues, Todolist} from '../app/App.tsx'
import {createAction, createReducer, nanoid} from "@reduxjs/toolkit";

const initialState: Todolist[] = []

export const deleteTodolistAC = createAction<{id: string}>('todolists/deleteTodolist')

export const changeTodolistTitleAC = createAction<{id: string, title: string}>('todolists/changeTodolistTitle')

export const changeTodolistFilterAC = createAction<{id: string, filter: FilterValues}>('todolists/changeTodolistFilter')

export const createTodolistAC = createAction('todolists/createTodolist', (title: string) => {
    return  {payload: { title, id: nanoid() }}
})

export const todolistsReducer = createReducer(initialState, builder => {
  builder.addCase(deleteTodolistAC, (state, action) => {
    const index = state.findIndex(todolist => todolist.id === action.payload.id)
    if (index !== -1) {
      state.splice(index, 1)
    }
  })
      .addCase(createTodolistAC, (state, action) => {
        state.push({...action.payload, filter: 'all'})
      })
      .addCase(changeTodolistTitleAC, (state, action) => {
        const index = state.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state[index].title = action.payload.title
        }
      })
      .addCase(changeTodolistFilterAC, (state, action) => {
        const index = state.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state[index].filter = action.payload.filter
        }
      })
})

// export const todolistsReducer = (state: Todolist[] = initialState, action: Actions): Todolist[] => {
//   switch (action.type) {
//     case 'delete_todolist': {
//       return state.filter(todolist => todolist.id !== action.payload.id)
//     }
//     case 'create_todolist': {
//       const newTodolist: Todolist = {id: action.payload.id, title: action.payload.title, filter: 'all'}
//       return [...state, newTodolist]
//     }
//     case 'change_todolist_title': {
//       return state.map(todolist => todolist.id === action.payload.id ? {...todolist, title: action.payload.title} : todolist)
//     }
//     case 'change_todolist_filter': {
//       return state.map(todolist => todolist.id === action.payload.id ? {...todolist, filter: action.payload.filter} : todolist)
//     }
//     default:
//       return state
//   }
// }


// export const createTodolistAC = (title: string) => {
//   return {type: 'create_todolist', payload: { title, id: v1() }} as const
// }

// export const changeTodolistTitleAC = (payload: {id: string, title: string}) => {
//   return {type: 'change_todolist_title', payload} as const
// }

// export const changeTodolistFilterAC = (payload: {id: string, filter: FilterValues}) => {
//   return {type: 'change_todolist_filter', payload} as const
// }


// export type DeleteTodolistAction = ReturnType<typeof deleteTodolistAC>
// export type CreateTodolistAction = ReturnType<typeof createTodolistAC>
// export type ChangeTodolistTitleAction = ReturnType<typeof changeTodolistTitleAC>
// export type ChangeTodolistFilterAction = ReturnType<typeof changeTodolistFilterAC>
//
// type Actions =
//     | DeleteTodolistAction
//     | CreateTodolistAction
//     | ChangeTodolistTitleAction
//     | ChangeTodolistFilterAction
