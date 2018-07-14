import * as React from 'react';
import * as yaml from 'js-yaml';
import { connectContext } from 'connect-react-context';
import { ContextValues } from 'join-react-context';

import { L2dState } from '../model/l2d';
import {
    EveryContext,
    everyContext,
} from '../context';
import * as styles from './Viewport.scss';

interface ViewportProps {
    l2dState: L2dState | null;
}
const Viewport = class extends React.Component<ViewportProps> {
    render() {
        const {
            l2dState,
        } = this.props;
        if (l2dState == null) return <div className={styles['viewport']}/>;
        return <div className={styles['viewport']}>
            <pre>{ yaml.dump(l2dState) }</pre>
        </div>;
    }
}

export default connectContext<
    ContextValues<EveryContext>,
    ViewportProps,
    'l2dState'
>(
    everyContext.Consumer,
    ([ l2d, { stateName } ], props) => ({
        l2dState: l2d.states.find(state => state.name === stateName) || null,
        ...props,
    }),
)(Viewport);
