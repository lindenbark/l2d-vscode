import * as React from 'react';
import * as yaml from 'js-yaml';
import { connectContext } from 'connect-react-context';
import { ContextValues } from 'join-react-context';

import {
    EveryContext,
    everyContext,
} from '../context';
// import * as styles from './Viewport.scss';

interface ViewportProps {
    l2d: ContextValues<EveryContext>[0];
    stateName: ContextValues<EveryContext>[1]['stateName'];
}
const Viewport = class extends React.Component<ViewportProps> {
    render() {
        const {
            l2d,
            stateName,
        } = this.props;
        if (stateName == null) return null;
        return <pre>{ yaml.dump(l2d.states.find(state => state.name === stateName)) }</pre>;
    }
}

export default connectContext<
    ContextValues<EveryContext>,
    ViewportProps,
    'l2d' | 'stateName'
>(
    everyContext.Consumer,
    ([ l2d, { stateName, selectState } ], props) => ({ l2d, stateName, selectState, ...props }),
)(Viewport);
