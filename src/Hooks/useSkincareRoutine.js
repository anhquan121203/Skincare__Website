import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSkincareRoutine,
  deleteSkincareRoutine,
  fetchSkincareRoutines,
  updateSkincareRoutine,
} from "../Features/skincareRoutine/skincareRoutineSlice";

const useSkincareRoutine = () => {
  const dispatch = useDispatch();
  const { skincareRoutine, loading, error } = useSelector(
    (state) => state.skincareRoutine
  );

  // console.log("skincareRoutine", skincareRoutine);

  useEffect(() => {
    dispatch(fetchSkincareRoutines());
  }, [dispatch]);

  const addNewSkincareRoutine = async (skincareRoutine) => {
    await dispatch(createSkincareRoutine(skincareRoutine));
    dispatch(fetchSkincareRoutines());
  };

  const editSkincareRoutine = async (skincareRoutine) => {
    await dispatch(updateSkincareRoutine(skincareRoutine));
    dispatch(fetchSkincareRoutines());
  };

  const removeSkincareRoutine = async (id) => {
    await dispatch(deleteSkincareRoutine(id));
    dispatch(fetchSkincareRoutines());
  };

  return {
    skincareRoutine,
    loading,
    error,
    addNewSkincareRoutine,
    editSkincareRoutine,
    removeSkincareRoutine,
  };
};

export default useSkincareRoutine;
