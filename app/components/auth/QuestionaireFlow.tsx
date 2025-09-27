import { useEffect, useState, ReactNode } from "react";

const QuestionaireFlow = ({ children, setFormSubmitted }: {
  children: ReactNode[];
  setFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
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

  const handleNext = () => {
    if (count < children.length) {
      setCount((c) => c + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    localStorage.removeItem("questionaire-step");
    setFormSubmitted(true);
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