import { TodoItem } from '@/common/common'
import { createLogger, createStore, Store } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
import { TodoItemState } from '@/common/const'

const debug = process.env.NODE_ENV !== 'production'

const storage = {
  get () {
    return JSON.parse(localStorage.getItem('local_todos') || '[]')
  },
  set (value: any) {
    return localStorage.setItem('local_todos', JSON.stringify(value))
  }
}

const savePlugin = (
  store: Store<{
    todos: TodoItem[]
  }>
) => {
  store.state.todos = storage.get()
  store.subscribe((mutation, state) => {
    console.log('mutation', mutation)
    console.log('state', state)
    storage.set(state.todos)
  })
}

export default createStore({
  state: {
    todos: [] as TodoItem[]
  },
  getters: {},
  mutations: {
    add (state, value) {
      state.todos.push({
        id: uuidv4(),
        text: value,
        state: TodoItemState.OPEN
      })
    },
    check (state, id) {
      const index = state.todos.findIndex((v) => v.id === id)
      state.todos[index].state =
        state.todos[index].state === TodoItemState.DONE
          ? TodoItemState.OPEN
          : TodoItemState.DONE
    },
    remove (state, id) {
      const index = state.todos.findIndex((v) => v.id === id)
      state.todos[index].state = TodoItemState.DELETE
    }
  },
  actions: {},
  modules: {},
  plugins: debug ? [createLogger(), savePlugin] : [savePlugin]
})
