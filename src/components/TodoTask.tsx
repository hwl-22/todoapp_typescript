import { useState, useRef, useEffect } from 'react';
import Todo from '../model';

import {
  RiCheckboxBlankCircleLine,
  RiCheckboxBlankCircleFill,
} from 'react-icons/ri';
import { BiEdit } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { Draggable } from 'react-beautiful-dnd';

interface Props {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoTask = ({ todo, todos, setTodos, index }: Props) => {
  const [task, setTask] = useState<string>(todo.todo);
  const [edit, setEdit] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheck = (id: number) => {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isDone: !item.isDone } : item
      )
    );
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos((prev) =>
      prev.map((item) => (item.id === id ? { ...item, todo: task } : item))
    );

    setEdit(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <Draggable key={todo.id} draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <form
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onSubmit={(e) => handleEdit(e, todo.id)}
          onKeyDown={(e) => e.key === 'Enter' && handleEdit(e, todo.id)}
        >
          <div className="flex items-center justify-between p-4 bg-amber-300 rounded">
            <div className=" flex items-center gap-2 flex-1">
              {todo.isDone ? (
                <RiCheckboxBlankCircleFill
                  onClick={() => handleCheck(todo.id)}
                  className="cursor-pointer"
                />
              ) : (
                <RiCheckboxBlankCircleLine
                  onClick={() => handleCheck(todo.id)}
                  className="cursor-pointer"
                />
              )}

              {edit ? (
                <input
                  type="text"
                  value={task}
                  className="w-fit outline-none indent-2 text-sm md:text-base "
                  onChange={(e) => setTask(e.target.value)}
                  ref={inputRef}
                />
              ) : (
                <p
                  className={`text-sm md:text-base ${
                    todo.isDone && 'line-through'
                  } `}
                >
                  {task}
                </p>
              )}
            </div>

            <div className="flex items-center gap-4 text-xl ">
              <BiEdit
                onClick={() => setEdit((prev) => !prev)}
                className="cursor-pointer"
              />
              <MdDelete
                onClick={() => handleDelete(todo.id)}
                className="cursor-pointer"
              />
            </div>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default TodoTask;
