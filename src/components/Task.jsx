import { Button, Chip, select, Select, SelectItem } from "@nextui-org/react";
import { categories, theming } from "../utils/config.util";
import React from "react";
import { PencilIcon } from "@heroicons/react/20/solid";
import { CheckIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useTask } from "../contexts/taskContext";

function Task({ task }) {
  const {
    state: { labels, epics },
    handleUpdateTask,
    handleDeleteTask,
  } = useTask();

  const [isEditing, setIsEditing] = React.useState(false);

  const initialState = {
    id: task.id,
    name: task.name,
    epic: task.epic,
    label: task.label,
    status: task.status,
  };

  const [formState, setFormState] = React.useState(initialState);

  const onUpdateTask = async (task) => {
    try {
      // console.log(task);
      await handleUpdateTask(task);
      setIsEditing(false);
    } catch (error) {
      console.error(error);
    }
  };

  const onDeleteTask = async (task) => {
    try {
      await handleDeleteTask(task);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      action="#"
      noValidate
      key={task.id}
      className="flex gap-4 items-center bg-white/5 hover:bg-white/10 transition p-3 rounded-md"
      onSubmit={(e) => {
        e.preventDefault();
        onUpdateTask(formState);
      }}
    >
      <div className="flex flex-col gap-3 w-full">
        {/* TASK NAME */}
        <input
          type="text"
          value={formState.name}
          disabled={!isEditing}
          className={`bg-transparent rounded-md text-white border-none outline-none ${
            isEditing ? "!p-3 !bg-white/10" : ""
          }`}
          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
        />
        {/* EPIC & LABELS */}
        {task.label && task.epic && (
          <div className="flex gap-2">
            {task.epic && (
              <Chip
                color="secondary"
                variant="flat"
                className={`${theming.epic.text}`}
              >
                {formState.epic}
              </Chip>
            )}
            {task.label.map((label) => (
              <Chip
                key={label}
                variant="flat"
                className={`${theming.label.bg} ${theming.label.text}`}
              >
                {label}
              </Chip>
            ))}
          </div>
        )}
        {/* ACTIONS */}
        {isEditing && (
          <div className="flex items-center justify-between w-full gap-3 *:w-full *:flex-1">
            {/* EPICS */}
            <select
              name="epic"
              id="epic"
              className={`${theming.epic.bg} ${theming.epic.text} !px-4 rounded-xl h-10`}
              value={formState.epic}
              onChange={(e) =>
                setFormState((formState) => ({
                  ...formState,
                  epic: e.target.value,
                }))
              }
            >
              <option value="">Epic</option>
              {epics.map((epic) => (
                <option
                  key={epic.name}
                  value={epic.name}
                  className={`${theming.epic.text}`}
                >
                  {epic.name}
                </option>
              ))}
            </select>
            {/* LABELS */}
            <select
              name="label"
              id="label"
              className={`${theming.label.bg} ${theming.label.text} !px-4 rounded-xl h-10`}
              value={formState.label}
              onChange={(e) =>
                setFormState((formState) => ({
                  ...formState,
                  label: [...e.target.value.split(",")],
                }))
              }
            >
              <option value="">Label</option>
              {labels.map((label) => (
                <option
                  key={label.id}
                  value={label.name}
                  className={`${theming.label.text}`}
                >
                  {label.name}
                </option>
              ))}
            </select>
          </div>
        )}
        <div className="flex items-center justify-between">
          {isEditing && (
            <select
              className={`select`}
              name="status"
              id="status"
              value={formState.status}
              onChange={(e) =>
                setFormState((formState) => ({
                  ...formState,
                  status: e.target.value,
                }))
              }
            >
              <option value="">Status</option>
              {categories.map((category) => (
                <option
                  key={category.name}
                  value={category.name}
                  className="option"
                >
                  {category.label}
                </option>
              ))}
            </select>
          )}
          <div className="flex gap-3 items-center flex-1 justify-end">
            {!isEditing ? (
              <>
                <Button
                  isIconOnly
                  variant="flat"
                  color="primary"
                  className={"w-fit aspect-square text-primary"}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsEditing(!isEditing);
                  }}
                >
                  <PencilIcon className="w-5 h-5" />
                </Button>
                <Button
                  isIconOnly
                  variant="flat"
                  color="danger"
                  className={"w-fit aspect-square text-danger"}
                  onClick={(e) => {
                    e.preventDefault();
                    onDeleteTask(formState);
                  }}
                >
                  <TrashIcon className="w-5 h-5" />
                </Button>
              </>
            ) : (
              <Button
                type="submit"
                variant="flat"
                color="primary"
                // onClick={() => setIsEditing(!isEditing)}
                isIconOnly
                className={"w-fit aspect-square text-primary"}
              >
                <CheckIcon className="w-5 h-5" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}

export default Task;
