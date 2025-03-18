import React from 'react'
import "./WalletCustomer.css"

function WalletCustomer() {
    return (
        <div className='wallet-container'>
            <div className='wallet-form'>
                <div className="wallet-input">
                    <h3>Số tiền cần nạp</h3>
                    <input type="number" placeholder='Nhập số tiền cần nạp' />
                </div>
                <div className="wallet-money">
                    {/* <h3>Chọn mệnh giá</h3> */}
                    <button>100.000</button>
                    <button>200.000</button>
                    <button>500.000</button>
                    <button>1.000.000</button>
                    <button>10.000.000</button>
                </div>
                <div className='wallet-footer'>
                    <div> <input type="radio" /> Tôi đồng ý</div>

                    <button>Nạp tiền ngay</button>
                </div>
            </div>
        </div>
    )
}

export default WalletCustomer
