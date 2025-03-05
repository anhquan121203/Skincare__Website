import useSelection from "antd/es/table/hooks/useSelection";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../Features/cart/cartSlice";


const useCart = () => {
const dispatch = useDispatch();
const {cart, loading, error} = useSelection((state) => state.cart)

const addToCartfromProduct = (cart) => {
    dispatch(addToCart(cart))
}

}

export default useCart;