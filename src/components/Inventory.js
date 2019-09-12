import React from "react";
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddBudForm from './AddBudForm';
import EditBudForm from './EditBudForm';
import Login from'./login';
import base, { firebaseApp } from '../base';


class Inventory extends React.Component {

static propTypes = {
    weed: PropTypes.object,
    updateWeed: PropTypes.func,
    deleteWeed: PropTypes.func,
    loadWeedSamples: PropTypes.func
};

state = {
    uid: null, 
    owner: null
};

componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
        if(user) {
            this.authHandler({ user })
        }
    })
}

authHandler = async authData => {
    //1. look up the current store in FB database
    const store = await base.fetch(this.props.storeId, { context: this })
    //2. Claim it if there is no owner
if(!store.owner) {
    //save it as your own
    await base.post(`${this.props.storeId}/owner`, {
        data: authData.user.uid
    })
}
    //3. Set the state of the inventory component to reflect current user
this.setState({
    uid: authData.user.uid,
    owner: store.owner || authData.user.uid
})

    console.log(authData);
}

authenticate = provider => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
}

logout = async () => {
    console.log('logging out');
    await firebase.auth().signOut();
    this.setState({ uid: null });
}

    render() {
        const logout = <button onClick={this.logout}>Log Out!</button>;
        //1. check if they are logged in
        if(!this.state.uid){
           return <Login authenticate={this.authenticate} /> 
        }
        //2. check if they are not the owner of the store
        if (this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>Sorry you are not the owner!</p>
                    {logout}
                </div>
            )
        }
        //.3 they must be the owner.  Just render the inventory
        return (
            <div className="inventory">
               <h2>Inventory!!</h2>
               {logout}
               {Object.keys(this.props.weed).map(key => (
               <EditBudForm 
               key={key} 
               index={key}
               weed={this.props.weed[key]} 
               updateWeed={this.props.updateWeed}
               deleteWeed={this.props.deleteWeed}
               />
               ))}
               <AddBudForm addWeed={this.props.addWeed} />
               <button onClick={this.props.loadWeedSamples}>Load Bud</button>

            </div>
        )
    }
}

export default Inventory;