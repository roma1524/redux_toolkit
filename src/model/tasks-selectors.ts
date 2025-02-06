import type { TasksState } from '../app/App'
import type { RootState } from '../app/store'

export const selectTasks = (state: RootState): TasksState => state.tasks