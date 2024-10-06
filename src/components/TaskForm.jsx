import { PlusIcon } from "@heroicons/react/20/solid";
import {
  Button,
  Chip,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { categories, theming } from "../utils/config.util";
import { useTask } from "../contexts/taskContext";
import React from "react";

function TaskForm() {
  const [isInvalid, setIsInvalid] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [isTyping, setIsTyping] = React.useState(false);
  const inputRef = React.useRef(null);
  const labelInputRef = React.useRef(null);
  const epicInputRef = React.useRef(null);
  const [epic, setEpic] = React.useState({
    name: "",
  });
  const [label, setLabel] = React.useState({
    name: "",
  });

  const {
    state: { labels, epics, loading, error },
    handleAddTask,
    handleAddEpic,
    handleAddLabel,
  } = useTask();

  React.useEffect(() => {
    inputRef.current.focus();
  }, []);

  const initialFormState = {
    name: "",
    epic: "",
    label: [],
    status: "todo",
  };

  const [formState, setFormState] = React.useState(initialFormState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formState.name === "") {
      setIsInvalid(true);
      setMessage("Task name is required!");
      return;
    }

    await handleAddTask({ ...formState, date: new Date().toISOString() });

    setFormState(initialFormState);

    setIsInvalid(false);

    inputRef.current.focus();
  };

  const onAddLabel = async (e, label) => {
    try {
      e.preventDefault();
      await handleAddLabel(label);

      setLabel((label) => ({ name: "" }));

      labelInputRef.current.focus();
    } catch (error) {
      console.error(error);
    }
  };

  const onAddEpic = async (e, epic) => {
    try {
      e.preventDefault();
      await handleAddEpic(epic);

      setEpic((epic) => ({ name: "" }));

      epicInputRef.current.focus();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <form action="#" className="flex flex-col gap-3" onSubmit={handleSubmit}>
        {/* TASK INPUT */}
        <input
          ref={inputRef}
          label=""
          aria-label="name"
          name="name"
          type="text"
          className="input 2xl:w-[550px] xl:w-[550px] md:w-[400px] w-full !bg-secondary/20 !px-0"
          placeholder="Add a task..."
          value={formState.name}
          onChange={(e) => {
            setIsTyping(true);
            setFormState((formState) => ({
              ...formState,
              name: e.target.value,
            }));
          }}
        ></input>
        {/* ERROR MESSAGE */}
        {isInvalid && !isTyping && (
          <p className="text-danger text-md">{message}</p>
        )}
        {/* SELECT EPIC, LABEL, STATUS */}
        <div className="flex gap-3 *:flex-1">
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
                key={epic.id}
                value={epic.name}
                className={`${theming.epic.text}`}
              >
                {epic.name}
              </option>
            ))}
          </select>
          <select
            name="label"
            id="label"
            className={`${theming.label.bg} ${theming.label.text} !px-4 rounded-xl`}
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
          <select
            className="select"
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
        </div>
      </form>
      {/* BUTTONS */}
      <div className="flex justify-between items-center">
        {/* ADD EPIC BUTTON & ADD LABEL BUTTON */}
        <div className="flex gap-3">
          {/* EPIC */}
          <Popover
            placement="bottom-start"
            offset={10}
            classNames={{
              content: "bg-secondary/10 backdrop-blur-lg",
            }}
          >
            <PopoverTrigger>
              <Button
                variant="flat"
                color="secondary"
                className="text-secondary"
                // className="brightness-200"
                startContent={<PlusIcon className="w-5 h-5" />}
              >
                Epic
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[240px] p-3">
              <form action="" onSubmit={(e) => onAddEpic(e, epic)}>
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    name="name"
                    className="input w-full !bg-secondary/20 brightness-200 !px-0"
                    placeholder="Add an epic..."
                    value={epic.name}
                    onChange={(e) =>
                      setEpic((epic) => ({ ...epic, name: e.target.value }))
                    }
                    ref={epicInputRef}
                  />
                  <Button
                    variant="flat"
                    color="secondary"
                    className="brightness-200 hover:brightness-150 transition p-1"
                    isIconOnly
                    type="submit"
                  >
                    <PlusIcon className="w-5 h-5" />
                  </Button>
                </div>
              </form>
              <div className="flex flex-wrap gap-2 mt-3">
                {epics.map((epic) => (
                  <Chip
                    key={epic.id}
                    color="secondary"
                    className="brightness-200 hover:brightness-150 transition"
                    variant="flat"
                  >
                    {epic.name}
                  </Chip>
                ))}
              </div>
            </PopoverContent>
          </Popover>
          {/* LABEL */}
          <Popover
            placement="bottom-start"
            offset={10}
            classNames={{
              content: `${theming.label.bg} backdrop-blur-lg`,
            }}
          >
            <PopoverTrigger>
              <Button
                variant="flat"
                className={`${theming.label.bg} ${theming.label.text}`}
                startContent={<PlusIcon className="w-5 h-5" />}
              >
                Label
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[240px] p-3">
              <form action="" onSubmit={(e) => onAddLabel(e, label)}>
                <div className="flex gap-2 items-center">
                  <input
                    name="name"
                    type="text"
                    className={`${theming.label.bg} input w-full brightness-200 !px-0`}
                    placeholder="Add an label..."
                    value={label.name}
                    onChange={(e) =>
                      setLabel((label) => ({ ...label, name: e.target.value }))
                    }
                    ref={labelInputRef}
                  />
                  <Button
                    variant="flat"
                    className={`${theming.label.bg} ${theming.label.text} transition p-1`}
                    isIconOnly
                    type="submit"
                  >
                    <PlusIcon className="w-5 h-5" />
                  </Button>
                </div>
              </form>
              <div className="flex flex-wrap gap-2 mt-3">
                {labels.map((label) => (
                  <Chip
                    key={label.id}
                    className={`${theming.label.bg} ${theming.label.text}`}
                    variant="flat"
                  >
                    {label.name}
                  </Chip>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* SUBMIT BUTTON */}
        <Button
          variant="flat"
          color="primary"
          className="text-blue-500 hover:text-blue-600 transition"
          startContent={<PlusIcon className="w-5 h-5" />}
          type="submit"
          onClick={handleSubmit}
        >
          Add
        </Button>
      </div>
    </div>
  );
}

export default TaskForm;
