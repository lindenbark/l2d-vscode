import * as React from 'react';

import { L2d } from '../model/l2d';
import * as styles from './StateBar.scss';

interface StateBarProps {
    l2d: L2d;
}

export default class StateBar extends React.Component<StateBarProps> {
    render() {
        // const { l2d } = this.props;
        return <div className={styles['state-bar']}>StateBar</div>;
    }
}
