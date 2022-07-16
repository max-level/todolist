<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg bg-light mb-4">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class="nav-link" aria-current="page" to="/add"
                >待办事项</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/done">已完成</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/delete">已删除</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  <div class="container">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeView'
})
</script>
