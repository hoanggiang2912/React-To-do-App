import Task from "./Task";

function TaskBox({ category, tasks }) {
  return (
    <section key={category.name} className="min-w-[350px] max-w-[400px]">
      <h2 className="text-xl font-bold text-white font-madimi">
        {category.label}
      </h2>
      <div className="flex flex-col gap-4 p-3 border rounded-lg border-white/10 mt-3 overflow-y-auto h-[450px]">
        {tasks &&
          tasks
            .filter((task) => task.status === category.name)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((task) => <Task key={task.id} task={task} />)}
        {tasks[category.name]?.length === 0 && (
          <p className="text-white text-opacity-50 text-center">
            There is no task in this category.
          </p>
        )}
      </div>
    </section>
  );
}

export default TaskBox;
