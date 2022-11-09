import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import Todo from '../model';
import TodoTask from './TodoTask';

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList = ({ todos, setTodos }: Props) => {
  const [tab, setTab] = useState<string>('active');

  const handleDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const items = Array.from(todos);
    const [newOrder] = items.splice(source.index, 1);
    items.splice(destination.index, 0, newOrder);

    setTodos(items);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className=" p-4 bg-white rounded-md drop-shadow-md space-y-4 ">
        <div className="grid grid-cols-3 ">
          <p
            onClick={() => setTab('active')}
            className={` ${
              tab === 'active' && ' font-medium  bg-blue-500 text-white'
            }  text-sm  md:text-lg  text-center   p-2  border-black cursor-pointer`}
          >
            Active
          </p>

          <p
            onClick={() => setTab('pending')}
            className={` ${
              tab === 'pending' && ' font-medium  bg-blue-500 text-white'
            } text-sm  md:text-lg  text-center  p-2  border-black cursor-pointer`}
          >
            Pending
          </p>

          <p
            onClick={() => setTab('completed')}
            className={` ${
              tab === 'completed' && 'bg-blue-500 text-white'
            } text-sm md:text-lg  text-center p-2  cursor-pointer`}
          >
            Completed
          </p>
        </div>

        <Droppable droppableId="todo">
          {(provided) => (
            <div
              className="space-y-4"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {tab === 'active' &&
                todos?.map((todo, i) => (
                  <TodoTask
                    key={i}
                    index={i}
                    todo={todo}
                    todos={todos}
                    setTodos={setTodos}
                  />
                ))}

              {tab === 'pending' &&
                todos
                  ?.filter((item) => item.isDone === false)
                  .map((todo, i) => (
                    <TodoTask
                      key={i}
                      index={i}
                      todo={todo}
                      todos={todos}
                      setTodos={setTodos}
                    />
                  ))}

              {tab === 'completed' &&
                todos
                  ?.filter((item) => item.isDone === true)
                  .map((todo, i) => (
                    <TodoTask
                      key={i}
                      index={i}
                      todo={todo}
                      todos={todos}
                      setTodos={setTodos}
                    />
                  ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
};

export default TodoList;
