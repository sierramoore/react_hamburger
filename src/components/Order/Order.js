import React from 'react';
import classes from './Order.css';

const order = (props) => {
    // transform order ingredients obj to array with just [salad, 2] kind of info
    const ingredients = [];

    for (let ingredientName in props.ingredients) {

        ingredients.push(
            {
                name: ingredientName, // salad
                amount: props.ingredients[ingredientName] //2
            }
        )
    }

    // loop over all ingredients and amounts
    const ingredientOutput = ingredients.map(ig => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={ig.name}>
            {ig.name} ({ig.amount})
        </span>
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
};

export default order;
