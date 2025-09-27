import { SellerFlowData } from "@/types";
import { useEffect, useState, ReactNode } from "react";

const QuestionaireFlow = ({ children, onSubmit }: {
  children: ReactNode[];
  onSubmit?: () => void;
}) => {
  const [count, setCount] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    localStorage.removeItem("questionaire-step");
    setCount(1);
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("questionaire-step", String(count));
    }
  }, [count, isMounted]);

  const decrementCount = () => setCount((c) => Math.max(1, c - 1));

  const handleSubmit = async () => {
    if (onSubmit) {
      onSubmit();
    }
  };

  if (!isMounted) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (count < children.length) {
            setCount((c) => c + 1);
          } else {
            handleSubmit();
          }
        }}
      >
        <div>{children[count - 1]}</div>

        <button
          type="submit"
          key={`submit-${count}`}
        >
          {count < children.length ? "Next" : "Complete Sign Up"}
        </button>
      </form>

      {count > 1 && <button onClick={decrementCount}>Back</button>}
      Step {count} / {children.length}
    </>
  );
};

export default QuestionaireFlow;