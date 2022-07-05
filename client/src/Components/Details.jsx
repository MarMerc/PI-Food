import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { useEffect } from 'react';
import {getDetail} from '../Actions';
import Style from '../Styles/detail.module.css';

export default function Details(props) {
  console.log(props);
  const dispatch= useDispatch();

  useEffect(()=>{
    dispatch(getDetail(props.match.params.id));
  },[dispatch]);

  const recipeDetail = useSelector((state)=>state.detail);

  return (
    <div className={Style.detailCont}>
  {      recipeDetail.length>0 ?
        (  <div>
          
            <h1 className={Style.title}>{recipeDetail[0].title}</h1>
            <h5 className={Style.esp}>{recipeDetail[0].diets}</h5>
            <div className={Style.summDetail}>
              <h5 className={Style.esp}> Summary: </h5>
              <h5 dangerouslySetInnerHTML={{__html: recipeDetail[0].summary}} />        
            </div>
            <div className={Style.steps}>
              <h6 className={Style.esp}>Steps: </h6>
              <h5>{recipeDetail[0].steps}</h5>             
            </div>
            <div className={Style.colum2}>
              <img src={recipeDetail[0].image} className={Style.img} />
                <div className={Style.columCont}>
                  <h3>Health Score: </h3>
                  <h4>{recipeDetail[0].healthScore}</h4>                   
                </div>
            </div>
            
          </div>):<p>Loading ... </p>
  
  } 
           <Link to='/home'>
            <button>Back</button>
          </Link>
    </div>
  )
}
