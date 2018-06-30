import * as React from 'react';

import { L2dState } from '../model/l2d';
import {
    everyContext,
} from '../context';
import * as styles from './StateBar.scss';

export default class StateBar extends React.Component {
    render() {
        return <everyContext.Consumer>{ ([ l2d, { stateName, selectState } ]) =>
            <div className={styles['state-bar']}>{
                l2d.states.map(state => <State
                    selected={state.name === stateName}
                    onSelect={selectState}
                    state={state}
                />)
            }</div>
        }</everyContext.Consumer>;
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
