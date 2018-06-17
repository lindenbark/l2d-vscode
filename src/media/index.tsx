import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as yaml from 'js-yaml';

import './index.scss';
import StateBar from './components/StateBar';
import Timeline from './components/Timeline';
import Viewport from './components/Viewport';
import { L2d } from './model/l2d';

declare const initialContent: string;

type Document = { error: false, data: L2d } | { error: true, data: Error };

class App extends React.Component<{}, Document> {
    state: Document = getDocument(initialContent);
    onMessage = (e: MessageEvent) => 'content' in e.data && this.setState(getDocument(e.data.content));
    componentDidMount() { window.addEventListener('message', this.onMessage); }
    componentWillUnmount() { window.removeEventListener('message', this.onMessage); }
    componentDidCatch(error: Error) { this.setState({ error: true, data: error }); }
    render() {
        if (this.state.error) {
            const { data } = this.state;
            if ('stack' in data) return <pre>{ data.stack }</pre>;
            if ('name' in data && 'message' in data) return <pre>{ data.name }: { data.message }</pre>;
            return <p>error occurred</p>;
        }
        const { data } = this.state;
        return <>
            <StateBar l2d={data}/>
            <Timeline l2d={data}/>
            <Viewport l2d={data}/>
        </>;
    }
}

function getDocument(content: string): Document {
    try {
        return { error: false, data: validateL2d(yaml.safeLoad(content) as L2d) };
    } catch (error) {
        return { error: true, data: error };
    }
}

function validateL2d(l2d: L2d): L2d {
    if (l2d == null || typeof l2d !== 'object') throw new Error('l2d 문서는 object 형식이어야 합니다.');
    return l2d;
}

ReactDOM.render(<App/>, document.getElementById('app'));
