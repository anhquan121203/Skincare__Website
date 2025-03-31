import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createStepRoutine,
  fetchStepRoutineId,
  listStepRoutines,
} from "../Features/stepRoutine/stepRoutineSlice";

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


  useEffect(() => {
    dispatch(listStepRoutines());
  }, [dispatch]);

  const checkStepOfRoutine = (stepNumber, routineId) => {
    if (!stepRoutines || stepRoutines.length === 0) return false;
  
    return stepRoutines.some(
      (step) => step.stepNumber === stepNumber && step.routineId === routineId
    );
  };

  const addNewStepRoutine = async (stepRoutine) => {
    try {
      const stepExist = checkStepOfRoutine(stepRoutine.stepNumber, stepRoutine.routineId);
      if (stepExist) {
        throw new Error(
          "Bước này đã tồn tại trong routine này. Vui lòng nhập email khác!"
        );
      }
      console.log(checkStepOfRoutine(stepRoutine.stepNumber))

      await dispatch(createStepRoutine(stepRoutine));
      dispatch(listStepRoutines());
    } catch (error) {
      console.error("Error adding step routine:", error);
    }
  };

  return {
    stepRoutines,
    loading,
    error,
    addNewStepRoutine,
    checkStepOfRoutine,
  };
};

export default useStepRoutine;
