import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
    // transform state obj into arr of burger ingredients and output ingredient component
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey}/>
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el); // combine original array with each looped inner array element
        }, []);
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please start adding ingredients</p>
    }
    /*
    * loop over ingredients
    * return new arr full of ingredients
    * loop over the new ingredient arr and return component with key and types of ingredient attribute
    * used underscore in  map method bc dont need element, just i
    * reduce array of arrays into one big array to easily check if empty
    * check if there are ingredients
    * NOTE ingredient key name must match the cases to display them in burgerIngredient component
    * */

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;

// Object.keys returns array
// reduce((previousValue, currentValue) => {}, initialValue of reduced vale) params r agiven. takes nested arrays and outputs them into one big array
