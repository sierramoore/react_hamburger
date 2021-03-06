import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {
    state = {
        ingredients: null,
        price: 0
    }

    componentWillMount() {
        // get url
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {}; //store current queried ingredients from url
        let price = 0;
        for(let param of query.entries()){
            if(param[0] === 'price'){
                price = param[1]
            } else {
                // ['salad', 1]
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients: ingredients, totalPrice: price});
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>

                <Route
                    path={this.props.match.path + '/contact-data'}                           render={() => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...this.props}/>)}/>
            </div>
        )
    }
}

export default Checkout;

// in Route using render instead of component allows you to pass props
