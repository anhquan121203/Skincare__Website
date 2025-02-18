import "./Login.css";
import logo from "../../../assets/images/logo.png";
import iconGG from "../../../assets/login/iconGG.png";
import { Button } from "antd";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-left">
        <div className="login-logo">
          <img src={logo} alt="logo page" />
        </div>

        <p style={{ color: "white" }}>
          Làn da của bạn là cơ quan lớn nhất của cơ thể và nó xứng đáng nhận
          được mọi sự chăm sóc và yêu thương mà bạn có thể dành cho.
        </p>
        <Link to={"/register"}>
          <Button style={{ marginTop: "20px" }}>Đăng ký</Button>
        </Link>
      </div>

      {/* LOGIN RIGHT***************** */}
      <div className="login-right">
        <h2>Đăng nhập</h2>
        <form>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Nhập email của bạn..."
              required
            />
          </div>

          <div className="form-group">
            <label>Mật khẩu</label>
            <input
              type="password"
              name="password"
              placeholder="**********"
              required
            />
          </div>

          <div className="form-options">
            <label>
              <input type="checkbox" style={{ marginRight: "5px" }} />
              Giữ đăng nhập lần sau!!!
            </label>
            <Link>Quên mật khẩu</Link>
          </div>
          <button type="submit" className="login-button">
            Đăng nhập
          </button>
        </form>

        <p style={{ marginBottom: "-5px" }}>Hoặc đăng nhập với Google</p>
        <div className="social-login">
          <button className="google">
            <img src={iconGG} alt="" />
          </button>
        </div>

        <p>
          Không có tài không? <Link to="/register">Đăng ký</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
