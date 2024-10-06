export const theming = {
  epic: {
    input: "!bg-secondary/20",
    bg: "bg-secondary/20 data-[hover=true]:bg-secondary/20 focus:bg-secondary/30",
    text: "!text-secondary",
  },
  label: {
    bg: "!bg-orange-500/20 data-[hover=true]:bg-orange-500/20 focus:bg-orange-500/30",
    text: "!text-orange-500",
    input: "!bg-orange-500/20",
  },
};

export const categories = [
  {
    name: "todo",
    label: "🎯 To Do",
  },
  {
    name: "inProgress",
    label: "🚀 In Progress",
  },
  {
    name: "done",
    label: "✅ Done",
  },
];
