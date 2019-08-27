import React from 'react';

class EditFishForm extends React.Component {
    handleChange = event => {
        //update that weed
        // 1. take a copy of current weed
        const updateWeed = {
            ...this.props.weed,
            [event.currentTarget.name]: event.currentTarget.value
        }
        this.props.updateWeed(this.props.index, updateWeed)
    }
    render() {
        return <div className="fish-edit">
        <input type="text" name="name" onChange={this.handleChange} value={this.props.weed.name}/>
        <input type="text" name="price" onChange={this.handleChange} value={this.props.weed.price}/>
            <select type="text" name="status" onChange={this.handleChange} value={this.props.weed.status} >
                <option value="available">Dank!</option>
                <option value="unavailable">Sold Out!</option>
            </select>
            <textarea name="status" onChange={this.handleChange} value={this.props.weed.status} />
            <input type="text" name="image" onChange={this.handleChange} value={this.props.weed.image} />
            <button onClick={() => this.props.deleteWeed(this.props.index)}>
            Remove Weed
            </button>
        </div>

    }
}

export default EditFishForm;