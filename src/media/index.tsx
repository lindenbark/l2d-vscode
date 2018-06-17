import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as yaml from 'js-yaml';

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
        const { content } = this.state;
        try {
            const data = yaml.safeLoad(content);
            return <pre>{ yaml.safeDump(data) }</pre>;
        } catch (err) {
            return <p>error occured</p>;
        }
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));
