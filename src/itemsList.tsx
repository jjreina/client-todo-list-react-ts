import * as React from 'react';
import * as ReactDOM from 'react-dom';

import ItemEntity from './item'
import { itemAPI } from './api/itemAPI';
import { ItemRowComponent } from './itemRow'

interface Props {
  isAddButtonClicked : boolean;
  newItem : string;
}

interface State {
  items : Array<ItemEntity>;
}

export class ItemsListComponent extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {items: []};
  }

  // Standard react lifecycle function:
  // https://facebook.github.io/react/docs/component-specs.html
  public componentDidMount() {
   itemAPI.getAllItems().then((items) => 
       this.setState({items: items})
    );
  }

  public shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.isAddButtonClicked && nextProps.newItem) {
      let newList = this.state.items;
      let item = new ItemEntity();
      item.id = Math.random();
      item.task = nextProps.newItem;
      newList.push(item);
      this.setState({items: newList});
      return true;
    }
    else if (nextState) {
      return true;
    }
    else {
      return false;
    }
  }

  render() {
    return(
        <div className="row">
          <ul className="list-group">
            {this.state.items.map((item : ItemEntity) =>
                // Each child in an array or iterator should have a unique "key" prop. React doc.
                <ItemRowComponent key={item.id} item={item}/>
            )}
          </ul>
        </div>
    );
  }
}
