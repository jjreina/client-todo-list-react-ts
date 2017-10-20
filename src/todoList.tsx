import * as React from 'react';
import * as NotificationSystem from 'react-notification-system';

import { AddItemComponet } from './addItem'
import { ItemsListComponent } from './itemsList'
import ItemEntity from './item'
import { itemAPI } from './api/itemAPI';

interface State {
  newItem : string;
  items: Array<ItemEntity>;
  errorMsg: string;
}

interface Props {
}

export class TodoListComponent extends React.Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      newItem: '',
      items: [],
      errorMsg: '',
    };
  }

  _notificationSystem = null
  
  _addNotification(showWarningPopup : boolean) {
      this._notificationSystem.addNotification({
        title: showWarningPopup ? 'Warning!' : 'Success!',
        message: 'Add notification',
        level: showWarningPopup ? 'warning' : 'success',
        position: 'tc'
      });
  }

  updateTextImput(newItem: string) {
    this.setState({newItem: newItem});
  }

  addItem(item: string) {
    let newItem: ItemEntity = new ItemEntity();
    newItem.task = item;
    newItem.id = this.state.items.length +1;

    itemAPI.addItem(newItem).then( (item) => {
      console.log("The new item: " + item.task + " will be added to date base");
      this.state.items.push(newItem);
      itemAPI.getAllItems().then((items) => {
        this.setState({items: items})
      });
      this._addNotification(false);
    })
    .catch((error) => { 
      console.log("Error_: " + error);
      this._addNotification(true);
    });
  }

  // Standard react lifecycle function:
  // https://facebook.github.io/react/docs/component-specs.html
  public componentWillMount() {
    itemAPI.getAllItems().then((items) => 
       this.setState({items: items})
    );
  }

  componentDidMount() {
    this._notificationSystem = this.refs.notificationSystem;
  }

  public render() {
    return (
      <div>   
          <AddItemComponet
            newItem={this.state.newItem}
            updateTextImput={this.updateTextImput.bind(this)}
            addItem={this.addItem.bind(this)}
          />
          <br/>
          <ItemsListComponent
            items={this.state.items}
          />
          <NotificationSystem ref="notificationSystem" />
      </div>
    );
  }
}
