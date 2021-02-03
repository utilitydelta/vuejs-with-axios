<template>
  <div class="home">
    <button @click="doRequest()">Get Todos</button>
    <button @click="cancelRequest()">Cancel Get</button>
    <ul>
      <li v-for="item in todos" :key="item.id">{{ item.todo }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import axios, { CancelTokenSource } from "axios";
import Todo from "@/components/Todo";

@Component({
  components: {}
})
export default class ManualCancel extends Vue {
  todos: Todo[] = [];
  cancelToken?: CancelTokenSource;

  doRequest() {
    this.cancelToken = axios.CancelToken.source();

    // @ts-ignore
    this.$Progress.start();
    axios
      .get("http://localhost:3000/todos", {
        cancelToken: this.cancelToken.token
      })
      .then(response => {
        // @ts-ignore
        this.$Progress.finish();
        this.todos = response.data;
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          // @ts-ignore
          this.$Progress.finish();
        } else {
          // @ts-ignore
          this.$Progress.fail();
        }
      });
  }

  cancelRequest() {
    if (this.cancelToken) {
      this.cancelToken.cancel("Operation canceled by the user.");
      this.cancelToken = undefined;
    }
  }
}
</script>
