<template>
	<div class="w-96 bg-white shadow-md rounded-md px-8 py-6 space-y-6">
		<h1 class="text-3xl font-semibold">Todos</h1>
		<div class="flex gap-3 items-center">
			<div>
				<input id="all" value="all" type="radio" class="sr-only" v-model="selectedFilter" />
				<label
					for="all"
					:class="`cursor-pointer px-2 py-1 rounded text-sm border ${
						selectedFilter === 'all' ? 'bg-yellow-100' : 'bg-transparent'
					}`"
					@click="() => todoStore.setFilter('all')"
					>all</label
				>
			</div>
			<div>
				<input id="finished" value="finished" type="radio" class="sr-only" v-model="selectedFilter" />
				<label
					for="finished"
					:class="`cursor-pointer px-2 py-1 rounded text-sm border ${
						selectedFilter === 'finished' ? 'bg-green-100' : 'bg-transparent'
					}`"
					@click="() => todoStore.setFilter('finished')"
					>finished</label
				>
			</div>
			<div>
				<input id="unfinished" value="unfinished" type="radio" class="sr-only" v-model="selectedFilter" />
				<label
					for="unfinished"
					:class="`cursor-pointer px-2 py-1 rounded text-sm border ${
						selectedFilter === 'unfinished' ? 'bg-red-100' : 'bg-transparent'
					}`"
					@click="() => todoStore.setFilter('unfinished')"
					>unfinished</label
				>
			</div>
		</div>

		<div v-if="todoStore.getFilteredTodoList().length === 0" class="py-4 text-gray-300 text-center">
			<h3 class="text-2xl">No Todos</h3>
			<span class="text-sm">(add new todos)</span>
		</div>

		<div v-if="todoStore.getFilteredTodoList().length !== 0" class="flex flex-col gap-2">
			<div v-for="todo in todoStore.getFilteredTodoList()" :key="todo.id">
				<div
					:class="`border rounded px-4 py-2 shadow-sm flex justify-between ${
						todo.isFinished ? 'bg-green-50 line-through' : 'bg-red-50'
					}`"
				>
					<span>{{ todo.text }}</span>
					<div>
						<button
							class="text-xs p-1 rounded grayscale opacity-40 transition-all hover:opacity-70 hover:bg-black/5"
							@click="() => todoStore.removeTodo(todo.id)"
						>
							❌
						</button>
						<button
							class="text-xs p-1 rounded grayscale opacity-40 transition-all hover:opacity-70 hover:bg-black/5"
							@click="() => todoStore.toggleTodoFinished(todo.id)"
						>
							✔️
						</button>
					</div>
				</div>
			</div>
		</div>
		<form class="flex gap-3" @submit.prevent="() => addItemAndClear(todoInput)">
			<input
				type="text"
				class="border w-full px-3 py-2 focus:outline-blue-500 rounded"
				placeholder="Your todo here"
				v-model="todoInput"
			/>
			<button
				class="px-5 py-2 rounded text-sm bg-blue-500 text-white hover:bg-blue-600 transition-colors"
				type="submit"
			>
				ADD
			</button>
		</form>
	</div>
</template>

<script lang="ts">
import { ref } from "vue"
import { storeToRefs } from "pinia"

import { useTodoStore, RootState } from "../stores/todo"

export default {
	setup() {
		const todoStore = useTodoStore()

		const todoInput = ref("")
		const selectedFilter = ref<RootState["filter"]>("all")

		const { todoList } = storeToRefs(todoStore)

		const addItemAndClear = (text: string) => {
			if (text.length === 0) return
			todoStore.addTodo(text)
			todoInput.value = ""
		}

		return {
			todoInput,
			selectedFilter,

			todoList,

			todoStore,

			addItemAndClear,
		}
	},
}
</script>
