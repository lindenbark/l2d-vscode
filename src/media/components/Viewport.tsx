import * as React from 'react';
import * as yaml from 'js-yaml';

import {
    everyContext,
} from '../context';

export default class Viewport extends React.Component {
    render() {
        return <everyContext.Consumer>{ ([ l2d, { stateName, selectState } ]) =>
            <pre>{ yaml.dump(l2d) }</pre>
        }</everyContext.Consumer>;
    }
}
