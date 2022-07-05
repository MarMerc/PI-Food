import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link,useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { postRecipes,getAllDiets } from '../Actions';
import Style from '../Styles/recipeCreate.module.css';


export default function RecipeCreate() {
    const dispatch = useDispatch();
    const history = useHistory();
    const diets=useSelector((state)=>state.diets);
    const [errors, setErrors] = useState({});

    const [input, setInput] = useState({
        title:'',
        diets: [],
        summary:'',
        healthScore: '',
        steps: [],
        image:''
    });

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
        console.log(input)
    };

    function handleCheck(e){
        if(e.target.checked){
            setInput({
                ...input,
                diets: e.target.value
            })
        }
    };

    function handleCheckSteps(e){
        setInput({
            ...input,
            steps: [...input.steps,e.target.value]
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        if(
             input.title !=='' &&
             input.summary !== ''
        )
        {
          dispatch(postRecipes(input));
          alert('Receta Creada');
          setInput({
            title: '',
            summary: '',
            healthScore: '',
            diets: [],
            steps: [],
            image:''
          });
          history.push('/home');
        }else{
          alert('Campos incompletos')
         }
      }

    function validate(input){
        let errors = {}; 
        //----Error Title
        if( input.title.length>20)
            errors.title='Debes ingresar un nombre de no mas de 20 caracteres';
        //----Error Sumary
        else if( input.summary.length >50 )
            errors.summary='Debe ingresar un resumen de no mas de 50 caracteres';
        //----Error healthScore
        else if( !input.healthScore || isNaN(input.healthScore) || input.healthScore ==0 || input.healthScore<1 || input.healthScore>100 ) 
            errors.healthScore='El Health Score debe un numero entre 0 y 100';
        if(errors.title){
            document.getElementsByName('btnCrear').disabled=true;
        }
            return errors;
    }

    useEffect(()=>{
        dispatch(getAllDiets())
    },[]);

  return (
    <div className={Style.contentCreate}>
        <form onSubmit={(e=>handleSubmit(e))} className={Style.formulario}>
        <h1>Carga tu Receta</h1>
        <div className={Style.total}>
            <div className={Style.datos}>
                <div className={Style.contInp}>
                        <div className={Style.contInpInd}>
                            <div>
                                <label>Recipe Name:</label>
                                <input 
                                    type='text'
                                    value={input.title}
                                    name='title'
                                    onChange={(e=>handleChange(e))}
                                />                                
                            </div>
                            <div className={Style.error}>
                                   { <p className={Style.errorTit}>{errors.title}</p>}
                            </div>                            
                        </div>
                        <div className={Style.contInpInd}>
                            <div>
                                {/* <label>Summary:</label> */}
                                <textarea 
                                    type='text'
                                    name='summary'
                                    placeholder='Resumen'
                                    value={input.summary}
                                    cols='40'
                                    row='5'
                                    onChange={e=>handleChange(e)}  
                                    
                                />                                 
                            </div>
                            <div className={Style.error}>
                                {<p className={Style.errorsumm}>{errors.summary}</p>}
                            </div>
                        </div>
                        <div className={Style.contInpInd}>
                            <div>
                                <label>Health Score:</label>
                                <input 
                                    type='text'
                                    value={input.healthScore}
                                    name='healthScore'
                                    onChange={(e=>handleChange(e))}
                                />                                
                            </div>
                            <div className={Style.error}>
                                {<p className={Style.errorhs}>{errors.healthScore}</p>}
                            </div>
                        </div>            
                </div>
            <div className={Style.colum}>
                    <div className={Style.dietsType}>
                        
                        <label><input
                            type='checkbox'
                            name='glutenFree'
                            value='gluten free'
                            onChange={handleCheck}
                        />gluten free</label>

                        <label><input
                            type='checkbox'
                            name='dairyFree'
                            value='dairy free'
                            onChange={handleCheck}
                        />dairy free</label>

                        <label><input
                            type='checkbox'
                            name='paleolithic'
                            value='paleolithic'
                            onChange={handleCheck}
                        />paleolithic</label>

                        <label><input
                            type='checkbox'
                            name='ketogenic'
                            value='ketogenic'
                            onChange={handleCheck}
                        />ketogenic</label>

                        <label><input
                            type='checkbox'
                            name='fodmapFriendly'
                            value='fodmap friendly'
                            onChange={handleCheck}
                        />fodmap friendly</label>

                        <label><input
                            type='checkbox'
                            name='whole30'
                            value='whole 30'
                            onChange={handleCheck}
                        />whole 30</label>

                        <label><input
                            type='checkbox'
                            name='primal'
                            value='primal'
                            onChange={handleCheck}
                        />primal</label>

                        <label><input
                            type='checkbox'
                            name='lactoOvoVegetarian'
                            value='lacto ovo vegetarian'
                            onChange={handleCheck}
                        />lacto ovo vegetarian</label>

                        <label><input
                            type='checkbox'
                            name='ovoVegetarian'
                            value='ovo vegetarian'
                            onChange={handleCheck}
                        />ovo vegetarian</label>

                        <label><input
                            type='checkbox'
                            name='lactoVegetarian'
                            value='lacto vegetarian'
                            onChange={handleCheck}
                        />lacto vegetarian</label>

                        <label><input
                            type='checkbox'
                            name='vegetarian'
                            value='vegetarian'
                            onChange={handleCheck}
                        />vegetarian</label>

                        <label><input
                            type='checkbox'
                            name='pescatarian'
                            value='pescatarian'
                            onChange={handleCheck}
                        />pescatarian</label>

                        <label><input
                            type='checkbox'
                            name='vegan'
                            value='vegan'
                            onChange={handleCheck}
                        />vegan</label>
                </div>
                

                <div className={Style.stepsForm}>
                        <label>Steps:</label>
                        <div className={Style.stepNext}>
                            <textarea 
                                type='text'
                                name='step1'
                                placeholder='Indicaciones...'
                                cols='40'
                                row='5'
                                onChange={handleChange}  
                            />  
                            <button className={Style.btnplus}>+</button>              
                        </div>

                        <div className={Style.stepNext}>
                                <textarea 
                                    type='text'
                                    name='step2'
                                    placeholder='Indicaciones...'
                                    cols='40'
                                    row='5'
                                    onChange={handleChange}
                                    disabled='false'
                                />
                                <button disabled='false' className={Style.btnplus}>+</button>
                        </div>

                        <div className={Style.stepNext}>
                                <textarea 
                                    type='text'
                                    name='step3'
                                    placeholder='Indicaciones...'
                                    cols='40'
                                    row='5'
                                    onChange={handleChange}
                                    disabled='false'
                                />    
                                <button disabled='false' className={Style.btnplus}>+</button>            
                        </div>

                        <div className={Style.stepNext}>
                                <textarea 
                                    type='text'
                                    name='step4'
                                    placeholder='Indicaciones...'
                                    cols='40'
                                    row='5'
                                    onChange={handleChange}
                                    disabled='false'
                                /> 
                                <button disabled='false' className={Style.btnplus}>+</button>               
                        </div>

                        <div className={Style.stepNext}>
                                <textarea 
                                    type='text'
                                    name='step5'
                                    placeholder='Indicaciones...'
                                    cols='40'
                                    row='5'
                                    onChange={handleChange}
                                    disabled='false'
                                />  
                                <button disabled='false' className={Style.btnplus}>+</button>              
                        </div>
                        <div className={Style.imgCont}>
                            <div className={Style.impImg}>
                                <label>Image:</label>
                                <input 
                                    type='text'
                                    value={input.image}
                                    name='image'
                                    onChange={(e=>handleChange(e))}
                                />                                
                            </div>
                            <img src='https://i.pinimg.com/564x/76/87/bc/7687bc8bf2490c31b7ab25e819422fac.jpg' alt='Img' width="150px" height="150px"/>
                        </div>
                </div>           
            </div>
            <div className={Style.btnBar}>
                <Link to='/home' className={Style.link}><button>Volver</button></Link> 
                <button type='submit' className={Style.btn} name='btnCrear'>Crear Receta</button>   
            </div>
            </div>    
            <div className={Style.receta}>
                <image src='https://i.pinimg.com/564x/a1/d2/51/a1d25133bc8024c731953284dc41d41c.jpg' alt='receta' />
                <div className={Style.textoRec}>
                    <h1>{input.title}</h1>
                    <h3>Summary:</h3>
                    <h2>{input.summary}</h2>
                    <h4>Health Score:</h4>
                    <h3>{input.healthScore}</h3>
                </div>
            </div>        
        </div>
        </form>
    </div>
  )
}
