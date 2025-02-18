import { Link } from "react-router-dom";
import Logo from "../../../assets/images/logo.png";
import "./Register.css";

function Register() {
  return (
    <div className="register-container">
      {/* <div className="video-background">
                <video autoPlay loop muted className="background-video">
                    <source src="src/assets/image login/video6.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div> */}

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
        <form className="form-register">
          <div className="form-row-register">
            <div className="form-group-register">
              <label>Họ</label>
              <input
                type="text"
                name="firstName"
                placeholder="Họ..."
                required
              />
            </div>

            <div className="form-group-register">
              <label>Tên</label>
              <input
                type="text"
                name="lastName"
                placeholder="Tên..."
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
                required
                style={{ maxWidth: "400px" }}
              />
            </div>

            <div className="form-group-register">
              <label>Số điện thoại</label>
              <input
                type="text"
                name="phone"
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
              required
            />
          </div>

          <div className="form-group-register">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="demo@gmail.com"
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
                required
              />
            </div>

            <div className="form-group-register">
              <label>Nhập lại mật khẩu</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="********"
                required
              />
            </div>
          </div>

          <button type="submit" className="register-button">
            Đăng ký
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
