import * as React from 'react';
import * as yaml from 'js-yaml';

import { L2d } from '../model/l2d';
import {
    createConsumers,
    l2dContext,
    selectedStateContext,
    SelectedState,
} from '../context';

type Contexts = [typeof l2dContext, typeof selectedStateContext];
const Consumers = createConsumers<Contexts>([
    l2dContext,
    selectedStateContext,
]);
type ConsumeValues = [L2d, SelectedState];

export default class Viewport extends React.Component {
    render() {
        return <Consumers>{ ([ l2d, { stateName, selectState } ]: ConsumeValues) =>
            <pre>{ yaml.dump(l2d) }</pre>
        }</Consumers>;
    }
}
