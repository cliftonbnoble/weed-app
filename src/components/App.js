import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import weedSamples from '../sample-weed';
import Weed from "./Weed";
import base from "../base";

class App extends React.Component {
    state = {
        weed: {},
        order: {}
    }

    static propTypes = {
        match: PropTypes.object
    }

    componentDidMount() {
        const { params } = this.props.match;
        //first reinstate our localstorage
        const localStorageRef = localStorage.getItem(params.storeId);
        if(localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) })
        }
        
        this.ref = base.syncState(`${params.storeId}/weed`, {
            context: this,
            state: 'weed'
        });
    }

    componentDidUpdate() {
            console.log(this.state.order)
            localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
        }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

    

    addWeed = bud => {
        console.log(this.state)
        //take a copy of existing state
        const weed = {...this.state.weed};
        //add our new bud to the weed variable
        weed[`bud${Date.now()}`] = bud;
        //Set the new weed object to State
        this.setState({ weed })
        console.log(this.state)
    }

    updateWeed = (key, updateWeed) => {
        //1. take a copy of the current state
        const weed = {...this.state.weed}
        //2. update state
        weed[key] = updateWeed;
        //3. set that to state
        this.setState({ weed });
    };

    deleteWeed = (key) => {
//1. take a copy of state
const weed = { ...this.state.weed };
//2. update state
weed[key] = null;
//3. update state
this.setState({ weed });

    }

    loadWeedSamples = () => {
        this.setState({weed: weedSamples});
    }

    addToOrder = (key) => {
        //Take a copy of state
        const order = { ...this.state.order }
        //Add to the order or update the order
        order[key] = order[key] +1 || 1;
        //Call SetState to update State object
        this.setState({ order });
    }

    removeFromOrder = key => {
        //1. take a copy from state
        const order = { ...this.state.order }
        //2. remove the item from the order
        delete order[key];
        //3. call state to update our state
        this.setState({ order });
    };

render() {
    return (
        <div className="catch-of-the-day">
        <div className="menu">
        <Header tagline="Locally Grown Bud" />
        <ul className="fishes">
            {Object.keys(this.state.weed).map(key => (
            <Weed 
            key={key}
            index ={key} 
            details={this.state.weed[key]}
            addToOrder={this.addToOrder} 
            />
            ))}
        </ul>
        </div>
        <Order 
        weed={this.state.weed} 
        order={this.state.order} 
        removeFromOrder={this.removeFromOrder}
        />
        <Inventory 
        addWeed ={this.addWeed}
        updateWeed={this.updateWeed}
        deleteWeed={this.deleteWeed}
        loadWeedSamples ={this.loadWeedSamples} 
        weed={this.state.weed}
        storeId={this.props.match.params.storeId}
        />
        </div>
    );
}
}

export default App;