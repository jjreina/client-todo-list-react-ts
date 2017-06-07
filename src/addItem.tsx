import * as React from 'react';

import ItemEntity from './item';

interface Props {
  newItem : string;
  updateTextImput : (newItem : string) => void;
  isAddButtonClicked : boolean;
  updateAddButtonState : (clicked : boolean) => void;
}

export const AddItemComponet = (props : Props) => {
  return(
    <div className="centered">
      <div className="row">
        <div className="col-md-7">
          <input
            id="textInput"
            name="textInput"
            type="text"
            placeholder="Add new item"
            value={props.newItem}
            className="form-control input-md"
            onChange={(e) => { props.updateTextImput(e.target.value);
                              props.updateAddButtonState(false) }
            }>
          </input>
        </div>
        <div className="col-md-2">
          <button
            id="addButton"
            name="addButton" className="btn btn-success"
            onClick={() => props.updateAddButtonState(true)}>
            Add item
          </button>
        </div>
      </div>
    </div>
  );
}
