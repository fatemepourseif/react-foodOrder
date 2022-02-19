import React from 'react';

import classes from './Card.module.css'

const Card = (props) => {
    const classCard = `${classes.card} ${props.className}`
    return ( 
        <div className={classCard}>{props.children}</div>
     );
}
 
export default Card;