import * as React from 'react';
import * as ReactDOM from 'react-dom';

declare const initialContent: string;

interface AppState {
    content: string;
}
class App extends React.Component<{}, AppState> {
    state: AppState = { content: initialContent };
    onMessage = (e: MessageEvent) => 'content' in e.data && this.setState({ content: e.data.content });
    componentDidMount() { window.addEventListener('message', this.onMessage); }
    componentWillUnmount() { window.removeEventListener('message', this.onMessage); }
    render() {
        return <div>{
            this.state.content
                .split(/\r?\n/g)
                .map((text, index) => [text, <br key={index}/>])
                .reduce((prev, curr) => prev.concat(curr), [])
        }</div>;
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
