import * as React from 'react';
// import * as yaml from 'js-yaml';
import { connectContext } from 'connect-react-context';
import { ContextValues } from 'join-react-context';

import { L2dState } from '../model/l2d';
import {
    EveryContext,
    everyContext,
} from '../context';
import * as styles from './Timeline.scss';

interface TimelineProps {
    l2dState: L2dState | null;
}
const Timeline = class extends React.Component<TimelineProps> {
    render() {
        const {
            l2dState,
        } = this.props;
        if (l2dState == null) return <div className={styles['timeline']}/>;
        return <div className={styles['timeline']}/>;
    }
}

export default connectContext<
    ContextValues<EveryContext>,
    TimelineProps,
    'l2dState'
>(
    everyContext.Consumer,
    ([ l2d, { stateName } ], props) => ({
        l2dState: l2d.states.find(state => state.name === stateName) || null,
        ...props,
    }),
)(Timeline);
