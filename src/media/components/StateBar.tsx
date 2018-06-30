import * as React from 'react';

import { L2d, L2dState } from '../model/l2d';
import {
    createConsumers,
    l2dContext,
    selectedStateContext,
    SelectedState,
} from '../context';
import * as styles from './StateBar.scss';

type Contexts = [typeof l2dContext, typeof selectedStateContext];
const Consumers = createConsumers<Contexts>([
    l2dContext,
    selectedStateContext,
]);
type ConsumeValues = [L2d, SelectedState];

export default class StateBar extends React.Component {
    render() {
        return <Consumers>{ ([ l2d, { stateName, selectState } ]: ConsumeValues) =>
            <div className={styles['state-bar']}>{
                l2d.states.map(state => <State
                    selected={state.name === stateName}
                    onSelect={selectState}
                    state={state}
                />)
            }</div>
        }</Consumers>;
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
