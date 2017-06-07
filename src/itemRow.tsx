import * as React from 'react';

import ItemEntity from './item'

interface Props {
  item : ItemEntity;
}

export const ItemRowComponent = (props: Props) => {
   return(
        <li className="list-group-item" key={props.item.id}>{props.item.task}</li>
    ); 
}