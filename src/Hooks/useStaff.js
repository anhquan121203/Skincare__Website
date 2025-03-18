import { useDispatch, useSelector } from "react-redux";
import { updateStaffProfile } from "../Features/staff/staffSlice";

function useStaff() {
  const dispatch = useDispatch();
  const { staff, loading, error } = useSelector((state) => state.staff);

  const editStaff = async (staffInfo) => {
    await dispatch(updateStaffProfile(staffInfo));
  };

  return { staff, loading, error, editStaff };
}

export default useStaff;
