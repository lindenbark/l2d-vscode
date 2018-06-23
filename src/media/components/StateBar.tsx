import * as React from 'react';

import { L2d, L2dState } from '../model/l2d';
import * as styles from './StateBar.scss';

interface StateBarProps {
    l2d: L2d;
}
interface StateBarState {
    selectedStateName: string | null;
}

export default class StateBar extends React.Component<StateBarProps, StateBarState> {
    state: StateBarState = { selectedStateName: null };
    selectState = (selectedStateName: string) => this.setState({ selectedStateName });
    render() {
        const { l2d } = this.props;
        const { selectedStateName } = this.state;
        const _selectedStateName =
            (selectedStateName === null) ?
            (l2d.states[0].name || '') :
            selectedStateName;
        return <div className={styles['state-bar']}>{
            l2d.states.map(state => <State
                selected={state.name === _selectedStateName}
                onSelect={this.selectState}
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
