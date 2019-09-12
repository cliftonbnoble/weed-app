import React from 'react'
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';


class StorePicker extends React.Component {
    myInput = React.createRef();

    static propTypes = {
        history: PropTypes.object
    }
    
    goToStore = (event) => {
        //Stops the form from submitting again
        event.preventDefault()
        //Get the text from the input
        const storeName = this.myInput.value.value
        //Change the page to /store/whatever they entered
        this.props.history.push(`/store/${storeName}`)
    }
    render() {
        return ( 
        <form className="store-selector" onSubmit={this.goToStore}>
            <h2>Please Enter A Store</h2>
            <input type="text" ref={this.myInput} required placeholder="Store Name" defaultValue={getFunName()} />
            <button type="submit">Visit Store <span img="👉" alt="arrow"></span></button>
        </form>
        )
    }
}

export default StorePicker;