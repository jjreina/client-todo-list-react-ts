import ItemEntity from '../item';

class ItemAPI {
  // This would be performed on the server in a real app. Just stubbing in.
  private _clone(item) {
    return JSON.parse(JSON.stringify(item)); // return cloned copy so that the item is passed by value instead of by reference
  };


  // HTTP GET
  getAllItems(): Promise<ItemEntity[]> {

    const request = new Request('http://localhost:4000/api/items', {
      method: 'GET',
      mode: 'cors',
      redirect: 'follow',
      headers: new Headers({
        'Content-Type': 'text/plain'
      })
    })
    
    let promise = fetch(request);
    promise.catch( (error) => console.log(error) );
     return promise
      .then( (response) => (response.json()) )
      .then( (items) => (this.resolveMembers(items)) )
  }

  private resolveMembers(data : any) : ItemEntity[] {
    let items : ItemEntity[];
    if (Object.keys(data)[0] === 'error') { 
      throw data;
    } else {
        items = data.map((item) => {
        let newItem : ItemEntity = new ItemEntity();
        newItem.id = item.id;
        newItem.task = item.task;
        return newItem;
      });
    }
    return items;
  }

  // HTTP POST
  addItem(item: ItemEntity): Promise<ItemEntity> {
    const request = new Request('http://localhost:4000/api/items', {
      method: 'POST',
      mode: 'cors',
      redirect: 'follow',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        task: item.task,
        id: item.id
      })
    })
    
    let promise = fetch(request);
    return promise
      .then( response => response.json() )
      .then( (item) => this.resolveMember(item) )
      .catch( (error) => {
        console.log(error);
        throw error;
      });
  }

  private resolveMember (data : any) : ItemEntity {
    let newItem : ItemEntity;
    if (Object.keys(data)[0] === 'error') { 
      throw data.error;
    } else {
      newItem = new ItemEntity();
      newItem.id = data.id;
      newItem.task = data.task;
    }
    return newItem;
  }
}

export const itemAPI = new ItemAPI();
