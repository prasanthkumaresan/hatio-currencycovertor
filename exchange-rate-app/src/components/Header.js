import React from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import '../App.css'

function Header() {
  return (
    <div className='header-container'>
        <div className='logo-container'>
            <h1 className='header-logo'>hatio</h1>
            <span className='header-logo-sub'>A Billdesk company</span>
            <span className='header-logo-des'>SMARTER SOLUTIONS</span>
        </div>
        <div className='larger-navigations'>
            <span>Currency convertor</span>
            <span>Payment</span>
            <span>About us</span>
        </div>
        <GiHamburgerMenu className='hamburger-header' size="2rem" color='white' />
    </div>
  )
}

export default Header
