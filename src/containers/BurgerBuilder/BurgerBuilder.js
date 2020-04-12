import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";


const Ingredient_Prices = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: .7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            meat: 0,
            cheese: 0
        },
        totalPrice: 4
    }

    addIngredientHandler = (type) => {
        // get  old number of ingredients, make obj of new ingredients, add to ingredient in new obj
        const oldCount = this.state.ingredients[type];

        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = oldCount + 1;

        //update price
        const priceAddition = Ingredient_Prices[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        // re-set state with updated ingredients and price
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }

        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type] = oldCount - 1;

        //update price
        const priceDeduction = Ingredient_Prices[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        // re-set state with updated ingredients and price
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    }

    render() {
        //copy ingredients
        const disabledInfo = {
            ...this.state.ingredients
        }
        // if 0 of any ingredient disable btn
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0; // {salad: true, bacon: false..}
        }
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;
