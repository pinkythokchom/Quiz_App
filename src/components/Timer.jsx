import { useEffect, useState } from "react";

const Timer = ({ resetKey }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    setSeconds(0);
    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [resetKey]);

  return (
    <p className="text-sm text-gray-500">
      Time: {seconds}s
    </p>
  );
};

export default Timer;
