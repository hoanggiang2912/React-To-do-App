import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { Spinner } from "@nextui-org/react";
import React, { useCallback } from "react";
import Header from "./components/Header";
import TaskBox from "./components/TaskBox";
import TaskForm from "./components/TaskForm";
import Patterns from "./components/Patterns";
import { useTask } from "./contexts/taskContext";
import { categories } from "./utils/config.util";

function App() {
  const {
    state: { tasks, labels, epics, loading, error },
    loadTasks,
    loadLabels,
    loadEpics,
  } = useTask();

  const loadAllData = React.useCallback(() => {
    loadTasks();
    loadLabels();
    loadEpics();
  }, [loadTasks, loadLabels, loadEpics]);

  React.useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  return (
    <div
      className="bg-[#180828] filter w-full h-screen relative p-8 overflow-hidden"
      style={{
        backgroundImage: "url('/src/assets/noise-bg-100.jpg')",
      }}
    >
      {/* ABSOLUTE PATTERNS */}
      <Patterns />

      {/* LOADER */}
      {loading && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-lg flex-center z-50">
          <div className="flex flex-col flex-center">
            <Spinner color="white" />
            <p className="text-white">Loading...</p>
          </div>
        </div>
      )}
      {error && (
        <div className="absolute inset-0 bg-black backdrop-blur-lg flex-center z-50">
          <div className="flex flex-col flex-center">
            <ExclamationTriangleIcon className="w-10 h-10 text-danger" />
            <p className="text-danger">{error.message}</p>
          </div>
        </div>
      )}

      {/* MAIN CONTENT */}
      <main className="relative z-20">
        <div className="flex flex-col flex-center mt-5 gap-8">
          {/* HEADER */}
          <Header />
          {/* FORM */}
          <TaskForm />

          {/* TASKS SECTION */}
          <section className="flex gap-8 h-full">
            {categories.map((category) => (
              <TaskBox key={category.name} category={category} tasks={tasks} />
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
