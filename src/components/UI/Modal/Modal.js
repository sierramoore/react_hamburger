import React, {Component} from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux/Aux';
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        //only update if show changes
        // also need to check if children of it changed bc we have spinner element as child of modal so we can trigger the reRender
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[Modal will update]')
    }


    render() {
        return (
            <Aux>
                <Backdrop  show={this.props.show} clicked={this.props.modalClosed}/>
                <div className={classes.Modal}
                     style={{
                         transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                         opacity: this.props.show ? '1' : '0'
                     }}>
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;
