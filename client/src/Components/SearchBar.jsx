import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import {getRecipeName} from '../Actions/index.js';
import Style from '../Styles/searchBar.module.css';

export default function SearchBar() {
const dispatch = useDispatch();
const [title,setTitle] = useState('');

function handleInput(e){
    e.preventDefault();
    setTitle(e.target.value)
    console.log(title)
};

function handleSubmit(e){
    e.preventDefault();
    dispatch(getRecipeName(title))
}

  return (
    <div className={Style.constSearch}>
        <input 
            type='text'
            placeholder='Search...'
            onChange={(e)=>handleInput(e)}
        />
        <button type='submit' onClick={(e)=>handleSubmit(e)}>Search</button>
    </div>
  )
}
