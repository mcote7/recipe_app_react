import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from '@reach/router';



const OpenFridge = () => {

const [ingredients, setIngredients] = useState([]);
const [name, setName] = useState("");
const [errors, setErrors] = useState([]);
const [loaded, setLoaded] = useState(false);
const [searchLoading, setSearchLoading] = useState(false);
const [searchResult, setSearchResult] = useState("");
const [searchErrors, setSearchErrors] = useState("");
let [page, setPage] = useState(1);


useEffect(() => {
    getIngredients();
}, [])

const getIngredients = ()=> {
    axios.get('http://localhost:8000/api/ingredients')
        .then(res=>{
            setIngredients(res.data);
            setLoaded(true);
            setSearchErrors('');
            console.log(res.data);
        });
}
// -------------------------------------------------------------------<<<<<
const createIngredient = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/ingredient/create', {
        name
    })
    .then(res=>{
        getIngredients();
        setName("");
        setErrors("");
        console.log(res)
    })
    .catch(err=>{
        console.log(err.response.data.errors);
        const errorResponse = err.response.data.errors;
        const errorArr = [];
        for (const key of Object.keys(errorResponse)) {
            errorArr.push(errorResponse[key].properties.message)
        }
        setErrors(errorArr);
    })
};
// -------------------------------------------------------------------<<<<<
const deleteOneIngredient = (ingredientId) => {
    axios.delete('http://localhost:8000/api/ingredient/delete/' + ingredientId)
    .then(res => {
        getIngredients();
        console.log(res)
    })
}

const deleteAllIngredients = () => {
    axios.delete('http://localhost:8000/api/ingredients/deleteall')
    .then(res => {
        getIngredients();
        console.log(res)
    })
}
// -------------------------------------------------------------------<<<<<

const ingredientNames = ingredients.map(i => i.name);
// console.log(`ingreds full: ${ingredients}`);
// console.log(`ingreds: ${ingredientNames}`);


const searchRecipies = () => {
    setSearchLoading(true);
    axios.get(`https://cors-anywhere.herokuapp.com/http://www.recipepuppy.com/api/?i=${ingredientNames}&p=${page}`)
    .then(res => {
        console.log(`results: ${res.data.results}`)
        setSearchLoading(false)
        console.log(`page: ${page}`);
        if(res.data.results.length <= 0) {
            setSearchErrors("i am error")
        }
        setSearchResult(res.data.results)})
    .catch(err => {setSearchErrors("this is error - " + err)})
    console.log(`hey:`);
    setName("");
    setErrors("");
    displayResults();
}

const nextPage = () => {
    setPage(page += 1);
    searchRecipies();
}
const prevPage = () => {
    if(page > 1) {
        setPage(page -= 1);
        searchRecipies();
    }
    else {
        searchRecipies();
    }
    
}

// ------------------------<<<--just returns search results---------------------------<<<<<
const displayResults = () => {

    if(searchLoading) {
        return(
            <h1 className="loading">&nbsp;&hearts;&nbsp;Loading . . .</h1>
        );
    }
    else if(searchErrors) {//------------------------------------------need fix-------<<<<<
        return(
            <h1 className="errormess">&bull;&nbsp;Search invalid please try again . . .</h1>
        );
    }
    else if(searchResult.length > 0 && !searchErrors) {
        return(
            <>
    <div className="col">
        <div className="row pageturner">
            <div className="turn">
                <button className="navbtns" onClick={(e)=>{prevPage()}}>&#8920;back</button>
                    <p className="psearch">&nbsp;your search results ( {page} )&nbsp;</p>
                <button className="navbtns" onClick={(e)=>{nextPage()}}>more&#8921;</button>
            </div>
        </div>
        <div className="row">
            <table>
                <thead>
                    <tr>
                        <th>Recipe :</th>
                        <th>Ingredients :</th>
                    </tr>
                </thead>
                <tbody>
                {searchResult.map((item, index) => {
                    
                    const ingredArray = item.ingredients.split(",");
                    let ingredientsInFridge = "";
                    let ingredientsNotInFridge = "";
                    let ingreds = [];
                    
                    ingredArray.forEach(i => {
                        let z = 0;
                        if(i[z].includes(" ")) {
                            const ingred = {
                                name: i.substr(1),
                                inFridge: false
                            }
                            ingreds.push(ingred);
                        }
                        else if(!i[z].includes(" ")) {
                            const ingred = {
                                name: i,
                                inFridge: false
                            }
                            ingreds.push(ingred);
                        }
                    })
                    ingreds.forEach( i => {
                    ingredientNames.forEach(x => {
                        if(x===i['name']) {
                            i['inFridge'] = true;
                        }
                    })
                    })
                    return <tr key={index}>
                                <td><a className="recipe-href" href={item.href} target="_blank" rel="noopener noreferrer">{item.title}</a></td>
                                {ingreds.map(x => {
                                    if(!x.inFridge) {
                                        ingredientsNotInFridge += "  " + x.name + ",";
                                    }
                                    if(x.inFridge) {
                                        ingredientsInFridge += "  " + x.name + ",";
                                    }
                                    return(console.log("done"));
                                })}
                                <td><span className="have">&nbsp;&nbsp;HAVE :&nbsp;</span><span>{ingredientsInFridge}</span>
                                <span>&nbsp;</span>&nbsp;&nbsp;<span className="need">&nbsp;&nbsp;NEED :&nbsp;</span>
                                <span style={{color: "red"}}>{ingredientsNotInFridge}&nbsp;more...</span></td>
                            </tr>})}
                </tbody>
            </table>
        </div>
        </div>
        </>
        );
    }
}
// -----------------------------------------------------------------<<<<<
    return(
        <>
<div className="bgcolor"></div>
    <div className="row">
        <div className="col door">
        <div className="circle"></div>
            <div className="fridge-main">

                <div className="row fridge-freezer freezer-inner">
                    <div className="search-form">
                        <p className="search-title">add ingredients</p>
                        <form onSubmit={createIngredient}>
                            <label className="label">ingredient :&nbsp;&nbsp;</label>
                            <input pattern="^[^\s].+[^\s]$" spellCheck="false" autoFocus={true} className="input" type="text" value={name} onChange={(e)=>setName(e.target.value)+setErrors('')}/>
                            &nbsp;&nbsp;<button className="submitbtn" type="submit">add</button><br/>
                            {errors && errors.filter(err => err.includes("ingredient")).map((err, index) => <span className="form-error" key={index}>{err}</span>)}<br/>
                        </form>
                    </div>
                </div>

                <div className="row fridge-cooler cooler-inner">
                    {ingredients.length > 0 ?
                    <div className="search-results">
                    {loaded && ingredients.map((ingredient, idx)=>{
                        return <div className="ingredients" key={idx}>
                            <p className="ingredientname">{ingredient.name}</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <button className="delbtn" onClick={(e)=>{deleteOneIngredient(ingredient._id)}}>remove</button>
                        </div>
                    })}
                    </div>:''}
                </div>

                <div className="fridge-bottom">
                    <button className="bottombtns btn-left" onClick={(e)=>{searchRecipies()}}>
                        &nbsp;&nbsp;search&nbsp;&nbsp;recipies&nbsp;&#9786;</button>
                    <button className="bottombtns btn-right" onClick={(e)=>{deleteAllIngredients()}}>remove all</button>
                </div>

            </div>
        </div>
        {displayResults()}
    </div>

    <div className="back">
        <Link to='/' className="mynavlinks">main</Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Link to='/fridge' className="mynavlinks">back</Link>
    </div>
        </>
    );
}

export default OpenFridge;

