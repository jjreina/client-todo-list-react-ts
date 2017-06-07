import ItemEntity from '../item';

class ItemAPI {
  // This would be performed on the server in a real app. Just stubbing in.
  private _clone(item) {
    return JSON.parse(JSON.stringify(item)); // return cloned copy so that the item is passed by value instead of by reference
  };


  // Just return a copy of the mock data
  getAllItems(): Promise<ItemEntity[]> {

    const request = new Request('http://localhost:4000/api/items', {
      method: 'GET',
      // mode: 'cors',
      redirect: 'follow',
      headers: new Headers({
        'Content-Type': 'text/plain'
      })
    })

    return fetch(request)
      .then( response => response.json())
      .then( (items) => this.resolveMembers(items))
      .catch( error => console.log(error) );  
  }

  private resolveMembers (data : any) : Promise<ItemEntity[]> {

    const itmes : ItemEntity[] = data.map((item) => {
      let newItem : ItemEntity = new ItemEntity();
      newItem.id = item._id;
      newItem.task = item.task;
      return newItem;
    });

    return Promise.resolve(itmes);
  }


  addItem(item: ItemEntity): Array<ItemEntity> {
    // ItemsMockData.push(item);
    return null; //this._clone(ItemsMockData);
  }
}

export const itemAPI = new ItemAPI();
