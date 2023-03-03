import { defineStore } from "pinia"
import { v4 as uuid } from "uuid"

export type Todo = {
	text: string
	id: string
	isFinished: boolean
}

export type RootState = {
	todoList: Todo[]
	filter: "all" | "finished" | "unfinished"
}

export const useTodoStore = defineStore("todos", {
	state: (): RootState => ({
		todoList: [],
		filter: "all",
	}),

	actions: {
		addTodo(text: string) {
			const todo = { text, id: uuid(), isFinished: false }
			this.todoList.push(todo)
		},
		removeTodo(id: string) {
			this.todoList = this.todoList.filter((todo) => todo.id !== id)
		},
		toggleTodoFinished(id: string) {
			this.todoList = this.todoList.map((todo) =>
				todo.id === id ? { ...todo, isFinished: !todo.isFinished } : todo
			)
		},
		setFilter(filter: RootState["filter"]) {
			this.filter = filter
		},
		getTodoList() {
			return this.todoList
		},
		getFilteredTodoList() {
			return this.todoList.filter((todo) => {
				if (this.filter === "all") return todo
				else if (this.filter === "finished") return todo.isFinished
				else if (this.filter === "unfinished") return !todo.isFinished
			})
		},
	},
})
