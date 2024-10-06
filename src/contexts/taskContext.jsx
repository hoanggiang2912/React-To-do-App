import React from "react";
import { API } from "../utils/config.util";

const TaskContext = React.createContext();

const initialState = {
  tasks: [],
  loading: false,
  error: null,
  epics: [],
  labels: [],
};

const taskReducer = (state, action) => {
  switch (action.type) {
    // STATUS
    case "LOADING":
      return { ...state, loading: true };
    case "FAILURE":
      return { ...state, loading: false, error: action.error };
    // ACTIONS
    case "FETCH_TASKS_SUCCESS":
      return { ...state, loading: false, tasks: action.payload };
    case "ADD_TASK_SUCCESS":
      return {
        ...state,
        loading: false,
        tasks: [...state.tasks],
      };
    case "DELETE_TASK_SUCCESS":
      return {
        ...state,
        loading: false,
        tasks: state.tasks.filter((task) => task.id !== action.payload),
      };
    case "FETCH_LABELS_SUCCESS":
      return { ...state, labels: action.payload, loading: false };
    case "FETCH_EPICS_SUCCESS":
      return { ...state, epics: action.payload, loading: false };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const fetchTasks = async (dispatch) => {
  dispatch({ type: "LOADING" });
  try {
    const response = await fetch(`${API.task}`);

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const data = await response.json();

    dispatch({ type: "FETCH_TASKS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "FAILURE", payload: error });
  }
};

const addTask = async (dispatch, task) => {
  dispatch({ type: "LOADING" });

  try {
    const response = await fetch(`${API.task}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await response.json();
    console.log(data);
    fetchTasks(dispatch);
  } catch (error) {
    dispatch({ type: "FAILURE", payload: error });
  }
};

const updateTask = async (dispatch, task) => {
  dispatch({ type: "LOADING" });

  try {
    const response = await fetch(`${API.task}/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await response.json();
    console.log(data);
    fetchTasks(dispatch);
  } catch (error) {
    dispatch({ type: "FAILURE", payload: error });
  }
};

const deleteTask = async (dispatch, task) => {
  dispatch({ type: "LOADING" });

  try {
    const response = await fetch(`${API.task}/${task.id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    // console.log(data);
    fetchTasks(dispatch);
  } catch (error) {
    dispatch({ type: "FAILURE", payload: error });
  }
};

const fetchLabels = async (dispatch) => {
  dispatch({ type: "LOADING" });

  try {
    const response = await fetch(`${API.label}`);

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const data = await response.json();

    dispatch({ type: "FETCH_LABELS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "FAILURE", payload: error });
  }
};

const addLabel = async (dispatch, label) => {
  dispatch({ type: "LOADING" });

  try {
    const response = await fetch(`${API.label}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(label),
    });
    const data = await response.json();
    console.log(data);
    fetchLabels(dispatch);
  } catch (error) {
    dispatch({ type: "FAILURE", payload: error });
  }
};

const fetchEpics = async (dispatch) => {
  dispatch({ type: "LOADING" });

  try {
    const response = await fetch(`${API.epic}`);

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    const data = await response.json();

    dispatch({ type: "FETCH_EPICS_SUCCESS", payload: data });
  } catch (error) {
    dispatch({ type: "FAILURE", payload: error });
  }
};

const addEpic = async (dispatch, epic) => {
  dispatch({ type: "LOADING" });

  try {
    const response = await fetch(`${API.epic}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(epic),
    });
    const data = await response.json();
    console.log(data);
    fetchEpics(dispatch);
  } catch (error) {
    dispatch({ type: "FAILURE", payload: error });
  }
};

const TaskProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(taskReducer, initialState);

  const loadTasks = React.useCallback(() => {
    fetchTasks(dispatch);
  }, [dispatch]);

  const loadLabels = React.useCallback(() => {
    fetchLabels(dispatch);
  }, [dispatch]);

  const loadEpics = React.useCallback(() => {
    fetchEpics(dispatch);
  }, [dispatch]);

  const handleAddTask = React.useCallback(
    (task) => {
      addTask(dispatch, task);
    },
    [dispatch]
  );

  const handleUpdateTask = React.useCallback(
    (task) => {
      updateTask(dispatch, task);
    },
    [dispatch]
  );

  const handleDeleteTask = React.useCallback(
    (task) => {
      deleteTask(dispatch, task);
    },
    [dispatch]
  );

  const handleAddLabel = React.useCallback(
    (label) => {
      addLabel(dispatch, label);
    },
    [dispatch]
  );

  const handleAddEpic = React.useCallback(
    (epic) => {
      addEpic(dispatch, epic);
    },
    [dispatch]
  );

  return (
    <TaskContext.Provider
      value={{
        state,
        dispatch,
        loadTasks,
        loadEpics,
        loadLabels,
        handleAddTask,
        handleUpdateTask,
        handleDeleteTask,
        handleAddLabel,
        handleAddEpic,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

const useTask = () => {
  const context = React.useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};

export { TaskContext, TaskProvider, useTask };
