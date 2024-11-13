import { useEffect, useState } from "react";
import { ToDoContextProvider } from "./contexts/ToDoContext";
import TodoForm from "./components/ToDoForm";
import TodoItem from "./components/ToDoItem";

function App() {
  const [todos, setTodos] = useState([]);
  
  const addTodo = (todo)=>{
    setTodos([{id: Date.now(), ...todo}, ...todos]);
  }
  // const addTodo = (todo) => {
  //   setTodos((prev) => [{id: Date.now(), ...todo}, ...prev] )
  // }

  const updatedTodo = (id, todo)=>{
    const items = todos.map((curr)=>{
      return (curr.id===id)?todo:curr;
    })
    setTodos(items);
  }

  const deleteTodo=(id)=>{
    const items = todos.filter((todo)=>{
      return todo.id!==id;
    })
    setTodos(items);
  }

  const toggleComplete = (id)=>{
    const items = todos.map((curr)=>{
      return (curr.id===id)?{...curr, completed: !curr.completed} : curr;
    })
    setTodos(items);
    console.log(todos);
  }

  useEffect(()=>{
    localStorage.setItem("Todo list", JSON.stringify(todos));
  },[todos]);


  useEffect(()=>{
    const data=JSON.parse(localStorage.getItem("Todo list")); 
    if (data && data.length > 0) {
      setTodos(data)
    }
  },[])

  return (
    <ToDoContextProvider value={{ todos, addTodo, updatedTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} 
                className='w-full'
              >
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToDoContextProvider>
  );
}

export default App;
