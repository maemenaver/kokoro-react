import TodoItem from "./TodoItem";
import TodoItemCreator from "./TodoListCreator";
import TodoListFilters from "./TodoListFilters";
import TodoListStats from "./TodoListStats";
import { useStore } from "./TodoStore";

export default function TodoList() {
    const todoList = useStore((state) => state.filteredTodoListState());

    return (
        <div>
            <TodoListStats />
            <TodoListFilters />
            <TodoItemCreator />
            {todoList.map((item) => (
                <TodoItem key={item.id} item={item} />
            ))}
        </div>
    );
}
