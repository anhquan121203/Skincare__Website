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
  // Validate schema
  const validationSchema = Yup.object({
    firstName: Yup.string().required("Tên phải bắt buộc"),
    lastName: Yup.string().required("Họ phải bắt buộc"),
    birthday: Yup.date().required("Ngày sinh phải bắt buộc"),
    phoneNumber: Yup.string()
      .matches(/^\d+$/, "Số điện thoại phải là số hợp lệ")
      .required("Số điện thoại bắt buộc nhập"),
    address: Yup.string().required("Địa chỉ bắt buộc nhập"),
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Email bắt buộc nhập"),
    password: Yup.string()
      .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
      .required("Mật khẩu bắt buộc nhập"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Mật khẩu không khớp")
      .required("Nhập lại mật khẩu bắt buộc"),
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
        }
      } catch (error) {
        toast.error("Đã xảy ra lỗi trong quá trình đăng ký");
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
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={
                  formik.touched.firstName && formik.errors.firstName
                    ? "error"
                    : ""
                }
                {...formik.getFieldProps("firstName")}
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <span className="error-text">*{formik.errors.firstName}</span>
              )}
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
                {...formik.getFieldProps("lastName")}
                style={{ width: "190px" }}
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <span className="error-text">{formik.errors.lastName}</span>
              )}
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
                {...formik.getFieldProps("birthday")}
                style={{ maxWidth: "400px" }}
              />
              {formik.touched.birthday && formik.errors.birthday && (
                <span className="error-text">{formik.errors.birthday}</span>
              )}
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
                {...formik.getFieldProps("phoneNumber")}
              />
              {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                <span className="error-text">{formik.errors.phoneNumber}</span>
              )}
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
              {...formik.getFieldProps("address")}
            />
            {formik.touched.address && formik.errors.address && (
              <span className="error-text">{formik.errors.address}</span>
            )}
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
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email && (
              <span className="error-text">{formik.errors.email}</span>
            )}
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
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <span className="error-text">{formik.errors.password}</span>
              )}
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
                {...formik.getFieldProps("confirmPassword")}
              />
              {formik.touched.confirmPassword &&
                formik.errors.confirmPassword && (
                  <span className="error-text">
                    {formik.errors.confirmPassword}
                  </span>
                )}
            </div>
          </div>

          <button
            type="submit"
            className="register-button"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Đang đăng ký..." : "Đăng ký"}
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
