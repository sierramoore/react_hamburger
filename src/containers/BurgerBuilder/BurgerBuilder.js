import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from '../../axios-orders';


const Ingredient_Prices = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: .7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('https://react-burger-f4468.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
            })
            .catch(error => {
                this.setState({error: true})
            })
    }

    updatePurchaseState (ingredients) {
        // copying ingredients from state here made a bug of only when adding 2 ingredients did the button become enabled. this was due to not getting updatedIngredients but if put param here and call it later in the methods we want which have updatedIngredients
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0); // 0 or however many ingredients we have

        // set to true if greater than 0 ingredients
        this.setState({purchasable: sum > 0})
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

        this.updatePurchaseState(updatedIngredients);
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

        this.updatePurchaseState(updatedIngredients);
    }

    // if dont use arrow need to bind this
    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
       /* this.setState({loading: true})
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Sierra',
                address: {
                    street: 'calle uno',
                    zipCode: '1234',
                    country: 'Spain'
                },
                email: 'me@me.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false, purchasing: false}) // remove loader and close modal
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false})
            }) */
        // node_name_of_ur_choice then .json and second param is data u want to pass

        // burger componenet is not loaded thru a route obj. only burgerbuilder is loaded thru route obj in app(therefore has special route props). components nested inside burgerBuilder doesnt get those props but can add them manually by wrapping nested component in withRouter
        const queryParams = [];
        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }

        const queryString = queryParams.join('&')

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
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

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients cant be loaded</p> : <Spinner/> // if error, show text else the spinner


        if (this.state.ingredients) { //only if ingredients are returned from firebase
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchasable={this.state.purchasable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice}/>
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler}/>
        }
        if(this.state.loading) { //if order was placed whilst sending post show spinner. to overwrite above if needed
            orderSummary = <Spinner />
        }


        // modalClosed is correct prop func to close the  backdrop
        return(
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>

                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);
// pass axios instance that withErrorHandler deals with
