import { useState } from 'react';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import Todo from './model';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<string>('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      setTodos((prev) => [
        ...prev,
        { id: Date.now(), todo: todo, isDone: false },
      ]);
      setTodo('');
    }
  };

  return (
    <div className=" w-screen h-screen flex flex-col items-center space-y-8 ">
      <div className=" w-[90%]  md:w-1/2 space-y-8  mt-8 ">
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />

        <TodoList todos={todos} setTodos={setTodos} />
      </div>
    </div>
  );
};

export default App;
