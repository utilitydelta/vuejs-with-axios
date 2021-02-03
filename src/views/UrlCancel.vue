<template>
  <div class="home">
    <button @click="doRequest()">Get Todos</button>
    <button @click="doRequestUsers()">Get Users</button>
    <ul>
      <li v-for="item in todos" :key="item.id">{{ item.todo }}</li>
    </ul>
    <ul>
      <li v-for="item in users" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import Todo from "@/components/Todo";
import User from "@/components/User";

@Component({
  components: {}
})
export default class ManualCancel extends Vue {
  todos: Todo[] = [];
  users: User[] = [];

  doRequestUsers() {
    // @ts-ignore
    this.$RequestHandler.AxiosService.get("http://localhost:3000/users")
      // @ts-ignore
      .then(response => {
        this.users = response.data;
      })
      .catch(this.standardRequestCatch);
  }

  standardRequestCatch(error: any) {
    if (axios.isCancel(error)) {
      console.log("Cancellation caught");
    } else {
      console.log("Actual error!");
    }
  }

  doRequest() {
    // @ts-ignore
    this.$RequestHandler.AxiosService.get("http://localhost:3000/todos")
      // @ts-ignore
      .then(response => {
        this.todos = response.data;
      })
      .catch(this.standardRequestCatch);
  }
}
</script>
