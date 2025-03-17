import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStepRoutineId } from "../Features/stepRoutine/stepRoutineSlide";

const useStepRoutine = (stepRoutineId) => {
  const dispatch = useDispatch();
  const { stepRoutines, loading, error } = useSelector(
    (state) => state.stepRoutine
  );

  useEffect(() => {
    if (stepRoutineId) {
      dispatch(fetchStepRoutineId(stepRoutineId));
    }
  }, [dispatch, stepRoutineId]);

  return { stepRoutines, loading, error };
};

export default useStepRoutine;
