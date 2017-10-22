import * as React from 'react';

import ItemEntity from './item'

import * as styles from './css/styles.css';

export const ItemRowComponent = (props: { item : ItemEntity}) => {
   return(
        <li className={`${styles.topBuffer} list-group-item`} key={props.item.id}>
            {props.item.task}
        </li>
    ); 
}
 