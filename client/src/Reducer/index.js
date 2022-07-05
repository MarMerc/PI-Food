import {GET_RECIPES} from '../Actions/index.js';

const initialState = {
    recipes : [],
    allRecipes:[],
    diets:[],
    detail:[]
};

function rootReducer (state= initialState, action){
    switch(action.type){
        case 'GET_RECIPES':
            return {
                ...state,
                recipes: action.payload,
                allRecipes: action.payload
            }
        case 'FILTER_BY_DIETS':
                const allRecipes = state.recipes
                const dietsFiltered=action.payload === 'all' ? 
                    allRecipes 
                    : allRecipes.filter(el=>el.diets.includes(action.payload))
                return {
                    ...state,
                    recipes: dietsFiltered
                }
        case 'POST_RECIPES':
                return {
                        ...state,
                    }
        case 'GET_All_DIETS':
            return {
                ...state,
                diets: action.payload
            }
        case 'ORDER_BY_NAME':
            const allRecipes2 = state.recipes
            const sortedRecipesAlph = action.payload === 'asc'?
            allRecipes2.sort(function(a,b){
                    if(a.title>b.title){return 1}
                    if(b.title>a.title){return -1}
                    return 0;
                }):
                allRecipes2.sort(function(a,b){
                    if(a.title>b.title){return -1}
                    if(b.title>a.title){return 1}
                    return 0;
                })
                return {
                    ...state,
                    recipes: sortedRecipesAlph
                }
        case 'GET_RECIPES_NAME':
                    return {
                        ...state,
                        recipes: action.payload
                    }
        case 'ORDER_BY_HS':
            let  sortedMaxMin = [...state.recipes]
            sortedMaxMin = action.payload === 'hSMax' ?
            sortedMaxMin.sort(function(a,b){
                return a.healthScore - b.healthScore
            }): sortedMaxMin.sort(function(a,b){
                return b.healthScore - a.healthScore
            })
                return {
                    ...state,
                    recipes: sortedMaxMin
                }
        case 'GET_DETAILS':
            return{
                ...state,
                detail: action.payload
            }
        default:
                return {...state};
    }
}
export default rootReducer;