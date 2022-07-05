import React, { useState } from 'react';
import Style from '../Styles/paginated.module.css';

export default function Paginated({recipesPerPage,allRecipes,paginado}) {

    const pageNumber = [];
    
    for(let i=1; i<Math.ceil(allRecipes/recipesPerPage);i++){
        pageNumber.push(i)
    }
    return (
        <nav>
                <ul className={Style.listPages}>
                {pageNumber && pageNumber.map(number =>(
                    <li key={number} className={Style.liPag}>
                        <a onClick={()=>paginado(number)} className={Style.aPag}>{number}</a>
                    </li>
                ))}          
            </ul>
        </nav>
  )
}
