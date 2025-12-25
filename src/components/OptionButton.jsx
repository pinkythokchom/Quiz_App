import { Button } from "./ui/button";

const OptionButton = ({ text, state, onClick }) => {
  const styles =
    state === "correct"
      ? "bg-green-500 text-white"
      : state === "incorrect"
      ? "bg-red-500 text-white"
      : "";

  return (
    <Button
      onClick={onClick}
      className={`w-full justify-start ${styles}`}
    >
      {text}
    </Button>
  );
};

export default OptionButton;
