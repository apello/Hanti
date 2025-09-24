import { SellerFlowData } from "@/types";
import { useEffect, useState, ReactNode } from "react";

const QuestionaireFlow = ({ children }: {
  children: ReactNode[];
}) => {
  const [count, setCount] = useState(1);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("questionaire-step");
    if (saved) setCount(Number(saved));
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("questionaire-step", String(count));
    }
  }, [count, isMounted]);

  const decrementCount = () => setCount((c) => Math.max(1, c - 1));

  const handleNext = () => {
    if (count < children.length) {
      setCount((c) => c + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {

  };

  if (!isMounted) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleNext();
        }}
      >
        <div>{children[count - 1]}</div>

        <input
          type="submit"
          value={count < children.length ? "Next" : "Submit"}
        />
      </form>

      {count > 1 && <button onClick={decrementCount}>Back</button>}
      Step {count} / {children.length}
      {count > 1 && <button onClick={decrementCount}>Back</button>}
      Step {count} / {children.length}
    </>
  );
};

export default QuestionaireFlow;