import React, { Component } from 'react';
import './Card.css'


class Card extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-image">
                    <img src={this.props.imageUrl} alt={this.props.name} />
                </div>
                <div className="card-name">{this.props.name}</div>
            </div>
        );
    }
}

export default Card;