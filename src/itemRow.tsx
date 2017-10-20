import * as React from 'react';

import ItemEntity from './item'

export const ItemRowComponent = (props: { item : ItemEntity}) => {
   return(
        <li className="list-group-item" key={props.item.id}>{props.item.task}</li>
    ); 
}