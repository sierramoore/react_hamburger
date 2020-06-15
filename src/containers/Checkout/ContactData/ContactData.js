import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }

    render() {
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact info</h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="your name"/>
                    <input className={classes.Input} type="text" name="email" placeholder="your email"/>
                    <input className={classes.Input} type="text" name="street" placeholder="your street"/>
                    <input className={classes.Input} type="text" name="postal" placeholder="your postal code"/>
                    <Button btnType="Success">ORDER</Button>
                </form>
            </div>
        )
    }

}

export default ContactData;
