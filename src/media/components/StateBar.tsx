import * as React from 'react';
import { connectContext } from 'connect-react-context';
import { ContextValues } from 'join-react-context';

import { L2dState } from '../model/l2d';
import {
    EveryContext,
    everyContext,
} from '../context';
import * as styles from './StateBar.scss';

interface StateBarProps {
    l2d: ContextValues<EveryContext>[0];
    stateName: ContextValues<EveryContext>[1]['stateName'];
    selectState: ContextValues<EveryContext>[1]['selectState'];
}
class StateBar extends React.Component<StateBarProps> {
    render() {
        const { l2d, stateName, selectState } = this.props;
        return <div className={styles['state-bar']}>{
            l2d.states.map(state => <State
                selected={state.name === stateName}
                onSelect={selectState}
                state={state}
            />)
        }</div>;
    }
}

interface StateProps {
    selected: boolean;
    onSelect: (stateName: string) => void;
    state: L2dState;
}
const State: React.SFC<StateProps> = ({
    selected,
    onSelect,
    state,
}) => {
    return <div
        className={`${ styles['state'] } ${ selected && styles['selected'] }`}
        onClick={() => onSelect(state.name)}>
        { state.name }
    </div>;
};

export default connectContext<
    ContextValues<EveryContext>,
    StateBarProps,
    'l2d' | 'stateName' | 'selectState'
>(
    everyContext.Consumer,
    ([ l2d, { stateName, selectState } ], props) => ({ l2d, stateName, selectState, ...props }),
)(StateBar);
