import React, { useEffect, useState } from "react";
import  Recipie from "./Recipie";
import './App.css';

const App = ()=>{

  const APP_ID = 'ff076916';
  const APP_KEY = '594b2f17bba1ad0d95999da1fcacdb12';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] =  useState('');
  const [query, setQuery] = useState('chicken');

 useEffect(()=>{
   getRecipie();
 },[query]);

 const getRecipie = async()=>{
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`)
  const data = await response.json();
  setRecipes(data.hits)
  console.log(data.hits)
}

const updateSearch = (e)=>{
     setSearch(e.target.value);
     console.log(search)
}

const getSearch = e=>{
  e.preventDefault();
  setQuery(search);
  setSearch('');
}

 
  return (
    <div className="App">
       <form onSubmit={getSearch} className="search-form">
         <input className="search-bar" type="text" value={search} onChange={updateSearch} />
         <button  className="search-button" type="submit">search</button>
       </form>
       <div className="recipes">
       {recipes.map(recipe =>(
         <Recipie key={recipe.recipe.label}
          title={recipe.recipe.label} 
          calories={recipe.recipe.calories} 
          image = {recipe.recipe.image}
          ingredients = {recipe.recipe.ingredients}
         />
       ))}
       </div>
    </div>
  )
}

export default App;
