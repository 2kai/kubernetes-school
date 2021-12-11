<template>
  <q-form @submit="submit" class="q-gutter-md">
    <q-input
        ref="todoInput"
        label="What do you want to do?"
        v-model="todoItem"
        :rules="[val => !!val || 'Field is required']"
        lazy-rules
    />
    <q-btn label="Create TODO" type="submit" color="primary"/>
  </q-form>
  <ul>
    <li v-for="(todoListItem) in todoList" :key="todoListItem.id">
      <q-checkbox
          v-model="todoListItem.is_done"
          @update:model-value="this.updateItemStatus(todoListItem)"
      />
      <span v-html="todoListItem.todo"></span>
    </li>
  </ul>
</template>

<script lang="ts">
import {Vue} from 'vue-class-component';
import axios, {AxiosResponse} from 'axios';
import {QInput} from 'quasar';

export default class ToDo extends Vue {
  readonly apiUrl = '/api';
  public todoItem: string = '';
  public todoList: object[] = [];

  $refs!: {
    todoInput: QInput
  }

  mounted() {
    axios.get(this.apiUrl + '/todos').then((response: AxiosResponse) => {
      this.todoList = response.data;
    });
  }

  submit() {
    axios.post(this.apiUrl + '/todos', {todo: this.todoItem}).then((response: AxiosResponse) => {
      this.todoList = response.data;
      this.todoItem = '';
      this.$refs.todoInput.resetValidation();
      this.$refs.todoInput.focus();
    });
  }

  updateItemStatus(todoItem: any) {
    axios.put(this.apiUrl + '/todos/' + todoItem.id, todoItem).then((response: AxiosResponse) => this.todoList = response.data);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
