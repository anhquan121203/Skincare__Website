import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CART, CART_API_URL } from "../../Constants/cartConstant";
import axios from "axios";
import { toast } from "react-toastify";

export const fetchCartProduct = createAsyncThunk(
  "cartProduct/GetCart",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.get(`${CART_API_URL}/GetCart`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createProductIntoCart = createAsyncThunk(
  "cartProduct/AddProductIntoCart",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      // console.log("Sending request with query params:", {
      //   productId,
      //   quantity,
      // });

      const response = await axios.post(
        `${CART_API_URL}/AddProductIntoCart?productId=${productId}&quantity=${quantity}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // console.log("Response from server:", response.data);
      return response.data;
    } catch (error) {
      console.error(
        "Error adding product to cart:",
        error.response?.data || error.message
      );
      return rejectWithValue("Vui lòng đăng nhập");
    }
  }
);

export const removeProductFromCart = createAsyncThunk(
  "cartProduct/removeProductFromCart",
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      await axios.delete(
        `${CART_API_URL}/RemoveProductFromCart?orderDetailId=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// export const checkout = createAsyncThunk(
//   "cartProduct/Checkout",
//   async (_, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const response = await axios.put(
//         `${CART_API_URL}/Checkout`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error.response?.data || error.message);
//     }
//   }
// );

export const checkout = createAsyncThunk(
  "cartProduct/Checkout",
  async ({ orderDetailsIds, totalPrice }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      // Kiểm tra token
      if (!token) {
        return rejectWithValue("Unauthorized: No token found");
      }

      // Gửi yêu cầu PUT với totalPrice trong query và orderDetailsIds trong body
      const response = await axios.put(
        `${CART_API_URL}/Checkout?totalPrice=${totalPrice}`,
        orderDetailsIds, // Gửi danh sách sản phẩm trong body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      return response.status;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const canceled = createAsyncThunk(
  "CanceledOrder/Canceled",
  async ({ orderId, totalPrice, status }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        return rejectWithValue("Unauthorized: No token found");
      }

      const response = await axios.put(
        `${CART_API_URL}/CanceledOrder?orderId=${orderId}&totalPrice=${totalPrice}&status=${status}`,
        null, // Không có body
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Hủy đơn hàng thành công, mã phản hồi:", response.status);
      return response.status; // Trả về HTTP status
    } catch (error) {
      console.error("Lỗi khi hủy đơn hàng:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const cartSlice = createSlice({
  name: CART,
  initialState: {
    carts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartProduct.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && Array.isArray(action.payload.listOrderDetail)) {
          state.carts = action.payload.listOrderDetail; // Extract `listOrderDetail`
        } else {
          state.carts = []; // Fallback if data is invalid
        }
      })
      .addCase(fetchCartProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProductIntoCart.fulfilled, (state, action) => {
        state.carts.push(action.payload);
        toast.success(`Thêm sản phẩm thành công: ${action.payload}`);
      })
      .addCase(createProductIntoCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Lỗi khi thêm sản phẩm vào giỏ: ${action.payload}`);
      })
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.carts = state.carts.filter((p) => p.id !== action.payload);
      })
      .addCase(checkout.fulfilled, (state, action) => {
        state.paymentResponse = action.payload; // Lưu dữ liệu từ API vào state
      })
      .addCase(checkout.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(canceled.fulfilled, (state, action) => {
        state.canceledResponse = action.payload;
      })
      .addCase(canceled.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default cartSlice;
