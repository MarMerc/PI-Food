import React, { useEffect,useState } from 'react';
import {useDispatch,useSelector} from 'react-redux';
import {getAllRecipes,filterRecipiesByDiets,orderByName,sortHS, postRecipes} from '../Actions/index.js';
import {Link} from 'react-router-dom';
import Card from './Card.jsx';
import Paginated from './Paginated.jsx';
import SearchBar from './SearchBar.jsx';
import Style from '../Styles/home.module.css';

export default function Home() {

  const dispatch=useDispatch();
  const allRecipes = useSelector((state)=>state.recipes);
  const [orden,setOrden] = useState('');
  const [currentPage,setCurrentPage]=useState(1);
  const [recipesPerPage,setRecipesPerPage]=useState(9);
  const indexOfLastRecipes = currentPage*recipesPerPage;
  const indesOfFirstRecipes = indexOfLastRecipes - recipesPerPage;
  const currentRecipes = allRecipes.slice(indesOfFirstRecipes,indexOfLastRecipes);

  const paginado=(pageNumber)=>{
    setCurrentPage(pageNumber);
  }
  
  useEffect(()=>{
    dispatch(getAllRecipes());
  },[dispatch]);

  function handleClick(e){
    e.preventDefault();
    dispatch(getAllRecipes());
  };

  function handleFilterDiets(e){
    dispatch(filterRecipiesByDiets(e.target.value))
  }

  function handleSort(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
  }

  function handleHs(e){
    e.preventDefault();
    dispatch(sortHS(e.target.value));
  }

  
    return (
      <div>
        <div className={Style.cabecera}>
          <Link to = '/create'>Nueva Receta</Link>
          <h1>FOOD</h1>          
        </div>
        <div className={Style.navBar}>
          <div className={Style.filters}>
            <div>
            <select onChange={e=>handleSort(e)}>
              <option value='asc'>asc</option>
              <option value='desc'>desc</option>
            </select>              
            </div>
            <div>
            <select onChange={e=>handleHs(e)}>
              <option value='hSMax'>Max Health Score</option>
              <option value='hSMin'>Min Health Score</option>
            </select>              
            </div>
            <div>
            <select onChange={e=>handleFilterDiets(e)}>
              <option value='all'>All</option>
              <option value='gluten free'>gluten free</option>
              <option value='dairy free'>dairy free</option>
              <option value='paleolithic'>paleolithic</option>
              <option value='lacto ovo vegetarian'>lacto ovo vegetarian</option>
              <option value='primal'>primal</option>
              <option value='whole 30'>whole 30</option>
              <option value='fodmap friendly'>fodmap friendly</option>
              <option value='ketogenic'>ketogenic</option>
              <option value='pescatarian'>pescatarian</option>
              <option value='vegan'>vegan</option>
            </select>              
            </div>

          </div>
          <button onClick={e=>{handleClick(e)}}>Recargar</button>  
          <SearchBar />         
        </div>

        <Paginated
          recipesPerPage={recipesPerPage}
          allRecipes={allRecipes.length}
          paginado={paginado}
        />
        
        <div className={Style.cards}>
          {
            currentRecipes.length?currentRecipes.map(r=>{
              return(
                <div>
                <Link to={`/recipes/${r.id}`}>
                  <Card
                    title={r.title}
                    image={r.image? r.image: <img src='https://i.pinimg.com/474x/b8/60/78/b86078158c8019cfa6c5bc6b48572f77.jpg' />}
                    diets={r.diets}
                    healthScore={r.healthScore}
                    createDB={r.createDB}
                  />                  
                </Link>
                </div>
                )
                }):<h2>No hay recetas disponibles</h2>
          }          
        </div>

      </div>
  )
}