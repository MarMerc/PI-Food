import axios from "axios";

export const GET_RECIPES = "GET_RECIPES";
export const FILTER_BY_DIETS = "FILTER_BY_DIETS";
export const ORDER_BY_NAME = "ORDER_BY_NAME";
export const GET_RECIPES_NAME = "GET_RECIPES_NAME";
export const ORDER_BY_HS = "ORDER_BY_HS";
export const GET_All_DIETS = "GET_All_DIETS";
export const GET_DETAILS = "GET_DETAILS";

export const RUTA_GET = 'http://localhost:3001/recipes';
//export const RUTA_GET_NAME = `http://localhost:3001/recipes?title=${title}`;
export const RUTA_GET_DIETS = 'http://localhost:3001/diets/create'; 
export const RUTA_POST_RECIPES = 'http://localhost:3001/recipes/create';

export function getAllRecipes(){
    return async function(dispatch){
        let respuesta=await fetch(RUTA_GET);
        const resJson = await respuesta.json();
        return dispatch({
            type: GET_RECIPES,
            payload: resJson
        })
    }
}

export function filterRecipiesByDiets(payload){
    return async function (dispatch){
        return dispatch ({
            type: 'FILTER_BY_DIETS',
            payload
        })        
    }
}

export function orderByName(payload){
    return async function (dispatch){
        return dispatch({
            type: 'ORDER_BY_NAME',
            payload
        })        
    }
}

export function getRecipeName(title){
    return async function (dispatch){
        try {
            var json = await axios.get(`http://localhost:3001/recipes?title=${title}`);
            return dispatch({
                type: 'GET_RECIPES_NAME',
                payload:json.data
            })              
        } catch (error) {
            console.log(error)
        }
    }
}

export function sortHS(payload){
    return async function (dispatch){
        return dispatch({
            type: 'ORDER_BY_HS',
            payload
        })
    }
}

export function getAllDiets(){
    return async function(dispatch){
        var res = await axios (RUTA_GET_DIETS);
        return dispatch({
            type:GET_All_DIETS,
            payload: res.data
        })    
    };
};

export function postRecipes(payload){
    return async function(dispatch){
        var respuesta = await axios.post(RUTA_POST_RECIPES,payload);
        console.log(respuesta);
        return respuesta;
    }
}

export function getDetail(id){
    return async function (dispatch){
        try {
            var json =await axios.get('http://localhost:3001/recipes/' + id)
            return dispatch ({
                type: 'GET_DETAILS',
                payload: json.data
            })        
        } catch (error) {
            console.log(error)
        }    
}


}
