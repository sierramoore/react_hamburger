import React, {Component} from 'react';
import axios from '../../../axios-orders';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    orderHandler = (e) => {
        e.preventDefault();
        this.setState({loading: true})
      const order = {
          ingredients: this.props.ingredients,
          price: this.props.price,
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
              this.setState({loading: false}) // remove loader and close modal
              this.props.push('/'); // redirect to homepage on order complete. have push method from using {...props} in checkout
          })
          .catch(error => {
              this.setState({loading: false})
          })
    }

    render() {
        let form = (
            <form>
                <input className={classes.Input} type="text" name="name" placeholder="your name"/>
                <input className={classes.Input} type="text" name="email" placeholder="your email"/>
                <input className={classes.Input} type="text" name="street" placeholder="your street"/>
                <input className={classes.Input} type="text" name="postal" placeholder="your postal code"/>

                <Button btnType="Success"
                        clicked={this.orderHandler}>
                    ORDER</Button>
            </form>
        );

        if(this.state.loading) {
            form = <Spinner/>
        }

        return (
            <div className={classes.ContactData}>

                <h4>Enter your contact info</h4>

                {form}
            </div>
        )
    }

}

export default ContactData;
