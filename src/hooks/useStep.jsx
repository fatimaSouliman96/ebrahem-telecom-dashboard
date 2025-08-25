import { useState } from "react";

const useStep = (initialStep = 1, minStep = 1, maxStep = 2) => {
  const [stepNum, setStepNum] = useState(initialStep);

  const incrementStep = () => {
    setStepNum((prev) => (prev < maxStep ? prev + 1 : prev));
  };

  const decrementStep = () => {
    setStepNum((prev) => (prev > minStep ? prev - 1 : prev));
  };

  return { stepNum, incrementStep, decrementStep, setStepNum };
};

export default useStep;
