import React from "react";
import { formatPrice } from "../helpers";
import { TransitionGroup, CSSTransition } from "react-transition-group";

class Order extends React.Component {
    renderOrder = key => {
        const weed = this.props.weed[key];
        const count = this.props.order[key];
        const isAvailable = weed && weed.status === 'available';
        const transitionOptions = {
            classNames: "order",
            key, 
            timeout: { enter: 500, exit: 500 }
        };
        //make sure weed is loaded before we continue
        if(!weed) return null;

        if(!isAvailable) {
            return (
            <CSSTransition {...transitionOptions}>
             <li key={key}>
                Sorry { weed ? weed.name : 'weed' } is no longer available
            </li>
            </CSSTransition>
            );
        }
        return (
        <CSSTransition {...transitionOptions}>
        <li key={key}>
        <span>
            <TransitionGroup component="span" className="count">
                <CSSTransition 
                classNames="count"
                key={count}
                timeout={{ enter: 500, exit: 500 }}
                >
                <span>{ count }</span>
                </CSSTransition>
            </TransitionGroup>
         lbs { weed.name }
        {formatPrice(count * weed.price)}
        <button onClick={() => this.props.removeFromOrder(key)}>
            &times;
        </button>
        </span>
        </li>;
        </CSSTransition>
        )};
    render() {
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            const weed = this.props.weed[key];
            const count = this.props.order[key];
            const isAvailable = weed && weed.status === 'available';
            if(isAvailable) {
                return prevTotal + (count * weed.price);
            }
            return prevTotal;
        }, 0);
        return (
            <div className="order-wrap">
                <h2>Order</h2>
                <TransitionGroup  component="ul" className="order">
                    {orderIds.map(this.renderOrder)}
                </TransitionGroup>
                <div className="total">
                    Total:
                    <strong>{formatPrice(total)}</strong>
                </div>
            </div>
        );
    }
}

export default Order;