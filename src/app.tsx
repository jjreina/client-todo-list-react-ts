import * as React from 'react';

import { TodoListComponent } from './todoList'

export class App extends React.Component<{}, {}> {
    public render() {
        return (
            <div>
                <TodoListComponent/>
            </div>
        );
    }
}