import { createContext, useContext } from "react";

export const ToDoContext = createContext({
    Todos: [
        {
            id: 1,
            todo: "task1",
            completed: false,
        }
    ],  
    addTodo: (todo)=>{},
    updatedTodo: (id, todo)=>{},
    deleteTodo: (id)=>{},
    toggleComplete: (id)=>{}
});

export const ToDoContextProvider = ToDoContext.Provider;

export default function useTodo(){
    return useContext(ToDoContext);
}