import React, {Component} from 'react';
import Aux from '../Aux/Aux';
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
    // anonymous class bc never use that class
    return class extends Component {
        state = {
            error: null
        }

        //componentDidMount is called after all child components have been rendered
            //componentWillMount will be called b4 child elems rendered
        componentWillMount() {
            this.reqInerceptor = axios.interceptors.request.use(req => {
                this.setState({error: null})
                return req; // have to return req
            })

            this.resInerceptor = axios.interceptors.response.use(res => res, error => {
                // have to return res above is shortest syntax for doing it
                this.setState({error: error})
                // there is message property on the error obj returned by firebase

            })
        }

        componentWillUnmount() {
            // if this hoc is used on muliple want to remove interceptors. need to store them when create then eject after mount
            axios.interceptors.request.eject(this.reqInerceptor)
            axios.interceptors.response.eject(this.resInerceptor)
        }

        errorConfirmedHandler = () => {
            this.setState({error: null})
        }

        render(){
            return (
                <Aux>

                    <Modal
                        show={this.state.error}
                        modalClosed={this.errorConfirmedHandler}>

                        {/*only if error show msg*/}
                        {this.state.error ? this.state.error.message : null}

                    </Modal>

                    <WrappedComponent {...this.props}/>

                </Aux>

            )
        }

    }

}

export default withErrorHandler;
