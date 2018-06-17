import * as React from 'react';
import * as yaml from 'js-yaml';

import { L2d } from '../model/l2d';

interface ViewportProps {
    l2d: L2d;
}

export default class Viewport extends React.Component<ViewportProps> {
    render() {
        const { l2d } = this.props;
        return <pre>{ yaml.dump(l2d) }</pre>;
    }
}
