import React, { useState } from "react";
import "./WalletCustomer.css";
import useAccount from "../../../Hooks/useAccount";
import { toast } from "react-toastify";

function WalletCustomer() {
  const { depositWallet } = useAccount();
  const [money, setMoney] = useState("");

  const handleDepositMoney = (event) => {
    event.preventDefault();

    const amount = Number(money);
    if (!amount || amount <= 0) {
      toast.error("Vui lòng nhập số tiền hợp lệ!");
      return;
    } else {
      toast.success("Nạp tiền thành công");
    }

    depositWallet(amount);
  };

  return (
    <div className="wallet-container">
      <form
        style={{ width: "50%" }}
        className="wallet-form"
        onSubmit={handleDepositMoney}
      >
        <div className="wallet-input">
          <h3>Số tiền cần nạp</h3> 
          <input
            type="number"
            placeholder="Nhập số tiền cần nạp"
            value={money}
            onChange={(e) => setMoney(e.target.value)}
          />
        </div>
        <div className="wallet-money">
          {/* <h3>Chọn mệnh giá</h3> */}
          <button type="button" onClick={() => setMoney(100000)}>
            100.000
          </button>
          <button type="button" onClick={() => setMoney(200000)}>
            200.000
          </button>
          <button type="button" onClick={() => setMoney(500000)}>
            500.000
          </button>
          <button type="button" onClick={() => setMoney(1000000)}>
            1.000.000
          </button>
          <button type="button" onClick={() => setMoney(10000000)}>
            10.000.000
          </button>
        </div>
        <div className="wallet-footer">
          <div>
            {" "}
            <input type="radio" /> Tôi đồng ý
          </div>

          <button type="submit">Nạp tiền ngay</button>
        </div>
      </form>
    </div>
  );
}

export default WalletCustomer;
