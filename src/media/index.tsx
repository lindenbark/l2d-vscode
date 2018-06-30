import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as yaml from 'js-yaml';

import './index.scss';
import StateBar from './components/StateBar';
import Timeline from './components/Timeline';
import Viewport from './components/Viewport';
import { L2d } from './model/l2d';
import {
    createProviders,
    l2dContext,
    selectedStateContext,
    SelectedState,
} from './context';

declare const initialContent: string;

type Document = { error: false, data: L2d } | { error: true, data: Error };
interface AppState {
    document: Document;
    selectedState: SelectedState;
}
class App extends React.Component<{}, AppState> {
    state: AppState = {
        document: getDocument(initialContent),
        selectedState: {
            stateName: null,
            selectState: (stateName: string | null) => this.setState({
                selectedState: { ...this.state.selectedState, stateName },
            }),
        },
    };
    onMessage = (e: MessageEvent) => 'content' in e.data && this.setState({ document: getDocument(e.data.content) });
    componentDidMount() { window.addEventListener('message', this.onMessage); }
    componentWillUnmount() { window.removeEventListener('message', this.onMessage); }
    componentDidCatch(error: Error) { this.setState({ document: { error: true, data: error } }); }
    render() {
        const { document, selectedState } = this.state;
        if (document.error) {
            const { data } = document;
            if ('stack' in data) return <pre>{ data.stack }</pre>;
            if ('name' in data && 'message' in data) return <pre>{ data.name }: { data.message }</pre>;
            return <p>error occurred</p>;
        }
        return <Providers values={[document.data, selectedState]}>
            <StateBar/>
            <Timeline/>
            <Viewport/>
        </Providers>;
    }
}

type Contexts = [typeof l2dContext, typeof selectedStateContext];
const Providers = createProviders<Contexts>([
    l2dContext,
    selectedStateContext,
]);

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
