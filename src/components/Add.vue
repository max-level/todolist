<template>
  <div class="form-group">
    <label for="">添加待办事项</label>
    <div class="row">
      <div class="col-8">
        <input
          type="text"
          class="form-control"
          v-model="inputValue"
          @keydown.enter="add"
        />
      </div>
      <div class="col-4">
        <select
          class="form-control"
          v-model="filterValue"
          @change="changeState"
        >
          <option :value="TodoItemState.ALL">选择以过滤...</option>
          <option :value="TodoItemState.OPEN">待办中...</option>
          <option :value="TodoItemState.DONE">已完成...</option>
          <option :value="TodoItemState.DELETE">已删除...</option>
        </select>
      </div>
      <small class="form-text text-muted">回车即可加入</small>
    </div>

    <ul class="list-group">
      <li
        class="list-group-item d-flex align-item-center justify-content-between"
        v-for="item in todos"
        :key="item.id"
        @click="check(item)"
      >
        <div>
          <input
            type="checkbox"
            class="form-checkinput"
            :checked="item.state === TodoItemState.DONE"
            :disabled="item.state === TodoItemState.DELETE"
            :id="item.id"
          />
          <label
            :for="item.id"
            @click.stop.prevent="check(item)"
            :class="{
              'text-black-50 line-through': item.state === TodoItemState.DONE
            }"
            >{{ item }}</label
          >
        </div>

        <div class="ctrls">
          <button class="btn btn-warning btn-sm mr-2">编辑</button>
          <button class="btn btn-danger btn-sm" @click.stop="remove(item)">
            删除
          </button>
        </div>
      </li>
    </ul>
  </div>
  <button class="btn btn-danger mt-4" @click="hide">
    {{ filterValue === TodoItemState.OPEN ? '显示所有' : '隐藏已完成' }}
  </button>
</template>

<script lang="ts">
import { TodoItem } from '@/common/common'
import { TodoItemState } from '@/common/const'
import { computed, defineComponent, ref } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'Add-Todo',
  setup () {
    const inputValue = ref('')
    const filterValue = ref(TodoItemState.ALL)
    const store = useStore()

    const add = () => {
      store.commit('add', inputValue.value)
      inputValue.value = ''
    }
    const check = (item: TodoItem) => {
      store.commit('check', item.id)
    }
    const remove = (item: TodoItem) => {
      store.commit('remove', item.id)
    }
    const changeState = () => {
      console.log(filterValue.value)
    }
    const filterItems = (value: TodoItemState) => {
      if (value === TodoItemState.ALL) {
        return store.state.todos
      }
      return store.state.todos.filter((v: TodoItem) => v.state === value)
    }
    const hide = () => {
      filterValue.value =
        filterValue.value === TodoItemState.OPEN
          ? TodoItemState.ALL
          : TodoItemState.OPEN
    }
    return {
      inputValue,
      filterValue,
      add,
      todos: computed(() => filterItems(filterValue.value)),
      TodoItemState,
      check,
      remove,
      changeState,
      hide
    }
  }
})
</script>

<style lang="scss" scoped>
.list-group-item {
  .ctrls {
    display: none;
  }
  &:hover {
    .ctrls {
      display: block;
    }
  }
}

.line-through {
  text-decoration: line-through;
}
</style>
