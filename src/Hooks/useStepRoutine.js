import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createStepRoutine,
  deleteStepRoutine,
  fetchStepRoutineById,
  listStepRoutines,
  updateStepRoutine,
} from "../Features/stepRoutine/stepRoutineSlice";

const useStepRoutine = (stepRoutineId) => {
  const dispatch = useDispatch();
  const { stepRoutines, loading, error } = useSelector(
    (state) => state.stepRoutine
  );

  useEffect(() => {
    if (stepRoutineId) {
      dispatch(fetchStepRoutineById(stepRoutineId));
    }
  }, [dispatch, stepRoutineId]);

  useEffect(() => {
    dispatch(listStepRoutines());
  }, [dispatch]);

  const checkStepOfRoutine = (stepNumber, routineId) => {
    if (stepRoutines.status === "Active") {
      return;
    }

    let exists = false;

    stepRoutines.forEach((step) => {
      if (
        step.routineId == routineId &&
        step.stepNumber == stepNumber &&
        step.status === "Active"
      ) {
        exists = true;
      }
    });
    // debugger
    return exists;
  };

  const addNewStepRoutine = async (stepRoutine) => {
    try {
      const stepExist = checkStepOfRoutine(
        stepRoutine.stepNumber,
        stepRoutine.routineId
      );
      if (stepExist) {
        throw new Error(
          `Bước ${stepRoutine.stepNumber} đã tồn tại trong routine ${stepRoutine.routineId}. Vui lòng chọn số bước khác!`
        );
      }

      await dispatch(createStepRoutine(stepRoutine));
      dispatch(listStepRoutines());
    } catch (error) {
      console.error("Error adding step routine:", error);
    }
  };

  const editStepRoutine = async (stepRoutine) => {
    await dispatch(updateStepRoutine(stepRoutine));
    dispatch(listStepRoutines());
  };

  const removeStepRoutine = async (id) => {
    await dispatch(deleteStepRoutine(id));
    dispatch(listStepRoutines());
  };

  return {
    stepRoutines,
    loading,
    error,
    addNewStepRoutine,
    checkStepOfRoutine,
    editStepRoutine,
    removeStepRoutine,
  };
};

export default useStepRoutine;
