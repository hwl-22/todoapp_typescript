import { MdAddCircleOutline } from 'react-icons/md';

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField = ({ todo, setTodo, handleAdd }: Props) => {
  return (
    <form
      onSubmit={handleAdd}
      onKeyDown={(e) => e.key === 'Enter' && handleAdd}
      className="w-full flex gap-4 items-center justify-center bg-white rounded-md drop-shadow-md"
    >
      <input
        className=" w-[90%] relative py-2 border-none outline-none indent-6 text-sm md:indent-2 md:text-base "
        type="text"
        placeholder="Create a task ..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />

      <button
        className="absolute top-1/2 left-0 translate-x-full -translate-y-1/2 "
        type="submit"
      >
        <MdAddCircleOutline className="text-lg" />
      </button>
    </form>
  );
};

export default InputField;
