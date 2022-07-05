import React from 'react';
import {Link} from 'react-router-dom';
import Style from '../Styles/card.module.css';

//https://i.pinimg.com/564x/1c/e2/9e/1ce29e58c0a3de1563d31952e7a1752f.jpg

export default function Card({id,title,image,diets,healthScore,steps, createDB}) {
  return (

        <div className={Style.cardContainer}>
          <div>
            <img src={image} className={Style.imgCard} alt='Image not found' width="200px" height="250px" />
          </div>
          <div className={Style.title}>
            <h3>{title}</h3>
          </div>
          <div className={Style.dietsCard}>
            { 
              diets.map(d=>
                  d.createDB?<p>{`*${d.name} `}</p>
                  :<p>{`*${d} `}</p> 
              )
            }
          </div>
          <div className={Style.hsCard}>
            <h6>healthScore:  </h6>
            <h4>{healthScore}</h4>
          </div>
        </div>         

     

  );
};
