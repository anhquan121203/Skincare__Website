import { Link, useNavigate } from "react-router-dom";
import Logo from "../../../assets/images/logo.png";
import "./Register.css";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { registerUser } from "../../../Api/authApi";
import { toast } from "react-toastify";
import { login } from "../../../Features/user/authSlice";
import * as Yup from "yup";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Validate schema
  const validationSchema = Yup.object({
    firstName: Yup.string().required("Tên phải bắt buộc"),
    lastName: Yup.string().required("Họ phải bắt buộc"),
    birthday: Yup.date().required("Ngày sinh phải bắt buộc"),
    phoneNumber: Yup.string()
      .matches(/^\d+$/, "Phone must be a valid number")
      .required("Số điện thoại bắt buộc nhập"),
    address: Yup.string().required("Địa chỉ bắt buộc nhập"),
    email: Yup.string().required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      birthday: "",
      phoneNumber: "",
      address: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await registerUser(values);

        if (response.status === 200) {
          console.log("đăng ký thành công!!!!");

          const { accessToken, refreshToken } = response.data;

          localStorage.setItem("accessToken", accessToken);
          localStorage.setItem("refreshToken", refreshToken);

          dispatch(login({ accessToken, refreshToken }));
          navigate("/login");
          toast.success("Đăng kí thành công!!!", { autoClose: 1000 });
        } else {
          toast.error(response.data.message || "Đăng kí thất bại!!!");
          console.log("đăng ký thất bại");
        }
      } catch (error) {
        toast.error("An error occurred during registration");
      }
    },
  });

  return (
    <div className="register-container">
      <div className="register-left">
        <div className="register-logo">
          <img src={Logo} alt="Logo" />
        </div>
        <h2> Chào mừng bạn đến với hành trình chăm sóc da!</h2>
        <p>
          Bằng cách đăng ký với chúng tôi, bạn đang thực hiện bước đầu tiên để
          có làn da khỏe mạnh và rạng rỡ. Cho dù bạn là người mới bắt đầu hay đã
          có kinh nghiệm trong việc chăm sóc da!
        </p>
      </div>

      <div className="register-right">
        <h2>Đăng ký</h2>
        <p>Tạo tài khoản mới của bạn</p>
        <form className="form-register" onSubmit={formik.handleSubmit}>
          <div className="form-row-register">
            <div className="form-group-register">
              <label>Họ</label>
              <input
                type="text"
                name="firstName"
                placeholder="Họ..."
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.firstName && formik.errors.firstName
                    ? "error"
                    : ""
                }
                required
              />
            </div>

            <div className="form-group-register">
              <label>Tên</label>
              <input
                type="text"
                name="lastName"
                placeholder="Tên..."
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.lastName && formik.errors.lastName
                    ? "error"
                    : ""
                }
                style={{ width: "190px" }}
                required
              />
            </div>
          </div>

          <div className="form-row-register">
            <div className="form-group-register">
              <label>Ngày sinh</label>
              <input
                type="date"
                name="birthday"
                value={formik.values.birthday}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.birthday && formik.errors.birthday
                    ? "error"
                    : ""
                }
                required
                style={{ maxWidth: "400px" }}
              />
            </div>

            <div className="form-group-register">
              <label>Số điện thoại</label>
              <input
                type="text"
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                    ? "error"
                    : ""
                }
                placeholder="Số điện thoại của bạn..."
                required
              />
            </div>
          </div>

          <div className="form-group-register">
            <label>Địa chỉ</label>
            <input
              type="text"
              name="address"
              placeholder="Nhập địa chỉ của bạn..."
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.address && formik.errors.address ? "error" : ""
              }
              required
            />
          </div>

          <div className="form-group-register">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="demo@gmail.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={
                formik.touched.email && formik.errors.email ? "error" : ""
              }
              required
            />
          </div>

          <div className="form-row-register">
            <div className="form-group-register">
              <label>Mật khẩu</label>
              <input
                type="password"
                name="password"
                placeholder="********"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.password && formik.errors.password
                    ? "error"
                    : ""
                }
                required
              />
            </div>

            <div className="form-group-register">
              <label>Nhập lại mật khẩu</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="********"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword
                    ? "error"
                    : ""
                }
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="register-button"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Đăngkí..." : "Đăng kí"}
          </button>
        </form>

        <p>
          Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
