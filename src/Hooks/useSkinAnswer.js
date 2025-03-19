import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { createSkinAnswer, fetchSkinAnswer } from "../Features/skinAnswer/skinAnswerSlice";

const useSkinAnswer = () => {
    const dispatch = useDispatch();
    const {skinAnswer, loading, error} = useSelector((state) => state.skinAnswer);

    useEffect(() => {
        dispatch(fetchSkinAnswer());
    }, [dispatch]);

    const addNewSkinAnswer = async (skinAnswer) => {
        await dispatch(createSkinAnswer(skinAnswer));
        dispatch(fetchSkinAnswer());
    }

    return {skinAnswer, loading, error, addNewSkinAnswer};
}

export default useSkinAnswer;