interface WorkshopBtnProps {
  setWorkshop: React.Dispatch<React.SetStateAction<boolean>>;
  name: string;
  state: boolean;
}

const WorkshopBtn = ({ state, setWorkshop, name }: WorkshopBtnProps) => {
  return (
    <div
      className={`flex items-center p-2 text-2xl border-2 rounded-lg shadow-xl border-fuchsia-950 ${state ? "bg-sky-400 hover:bg-sky-300 border-4" : "bg-sky-300 hover:bg-sky-400"}`}
    >
      <button
        className="drop-shadow-lg"
        onClick={() => setWorkshop((prev) => !prev)}
      >
        {name}
      </button>
    </div>
  );
};

export default WorkshopBtn;
