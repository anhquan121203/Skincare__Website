import React from 'react'
import "./WalletCustomer.css"

function WalletCustomer() {
    return (
        <div className='wallet-container'>
            <div className='wallet-form'>
                <input type="text" placeholder='Nhập số tiền cần nạp' />
                <button type='submit'>Nạp tiền</button>
            </div>
        </div>
    )
}

export default WalletCustomer
