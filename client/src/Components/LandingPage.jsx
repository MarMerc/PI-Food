import React from 'react'
import {Link} from 'react-router-dom';
import Style from '../Styles/landingPage.module.css';

function LandingPage() {
  return (
    <div className={Style.start}>
      <div className={Style.img}>
        <img src='https://i.pinimg.com/564x/71/e0/6a/71e06ad83aad5681b26ed638999214ad.jpg'/>
      </div>
       <div>
        <Link to='/home' className={Style.link}>
          <div className={Style.ini}>
            <h2>Gourmet</h2>
        </div>
        </Link>        
       </div>
    </div>
  )
}

export default LandingPage
