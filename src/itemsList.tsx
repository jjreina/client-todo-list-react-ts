import * as React from 'react';
import * as ReactDOM from 'react-dom';

import ItemEntity from './item'
import { ItemRowComponent } from './itemRow'

export const ItemsListComponent = (props: {items : Array<ItemEntity>}) => {

    return(
        <div className="row">
          <ul className="list-group">
            {props.items.map((item : ItemEntity) =>
                // Each child in an array or iterator should have a unique "key" prop. React doc.
                <ItemRowComponent key={item.id} item={item}/>
            )}
          </ul>
        </div>
    );
}
