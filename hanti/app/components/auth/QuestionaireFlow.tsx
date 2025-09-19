import { ReactNode, useEffect, useState } from "react";

const QuestionaireFlow = ({ children }: { children: ReactNode[] }) => {
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
  const incrementCount = () => setCount((c) => Math.min(children.length, c + 1));

  if (!isMounted) {
    return <div>Loading...</div>;
  }

  return (
    <>
        <form onSubmit={(e) => {
            e.preventDefault(); 
            incrementCount();
        }}>
            <div>{children[count - 1]}</div>
            {count < children.length && <input type="submit" value="Next" />}
        </form>

        {count > 1 && <button onClick={decrementCount}>Back</button>}
        Step {count} / {children.length}
    </>
  );
};

export default QuestionaireFlow;