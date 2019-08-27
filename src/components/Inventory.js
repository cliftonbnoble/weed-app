import React from "react";
import AddBudForm from './AddBudForm';
import EditBudForm from './EditBudForm';

class Inventory extends React.Component {
    render() {
        return (
            <div className="inventory">
               <h2>Inventory!!</h2>
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