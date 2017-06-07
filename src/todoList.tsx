import * as React from 'react';

import { AddItemComponet } from './addItem'
import { ItemsListComponent } from './itemsList'
import ItemEntity from './item'

interface State {
  newItem : string;
  isAddButtonClicked : boolean;
  items: Array<ItemEntity>;
}

interface Props {

}

export class TodoListComponent extends React.Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      newItem: '',
      isAddButtonClicked: false,
      items: []
    };
  }

  updateTextImput(newItem: string) {
    this.setState({newItem: newItem});
  }

  updateAddButtonState(clicked : boolean) {
    this.setState({isAddButtonClicked: clicked});
  }

  public render() {
    return (
      <div>       
          <AddItemComponet
            newItem={this.state.newItem}
            updateTextImput={this.updateTextImput.bind(this)}
            isAddButtonClicked={this.updateAddButtonState.bind(this)}
            updateAddButtonState={this.updateAddButtonState.bind(this)}
            />
          <br />
          <ItemsListComponent
          isAddButtonClicked={this.state.isAddButtonClicked}
          newItem={this.state.newItem}
          />
      </div>
    );
  }
}
