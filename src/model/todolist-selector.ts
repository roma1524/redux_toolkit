import {RootState} from "../app/store.ts";
import {Todolist} from "../app/App.tsx";

export const selectTodolidtd = (state: RootState): Todolist[] => state.todolists