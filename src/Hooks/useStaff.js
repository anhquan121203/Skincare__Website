import { useDispatch, useSelector } from "react-redux";
import { updateStaffProfile } from "../Features/staff/staffSlice";

function useStaff() {
  const dispatch = useDispatch();
  const { staffs, loading, error } = useSelector((state) => state.staff);

  const editStaff = async (staffInfo) => {
    console.log("staffInfo", staffInfo);
    await dispatch(updateStaffProfile(staffInfo));
    // dispatch(fetchStaffs());
  };

  return { staffs, loading, error, editStaff };
}

export default useStaff;
