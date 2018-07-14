import * as React from 'react';
import { joinContext } from 'join-react-context';

import * as l2d from './model/l2d';
import { noop } from './misc';

export const l2dContext = React.createContext<l2d.L2d>({ version: 'p0', states: [] });

export interface SelectedState {
    stateName: string | null;
    selectState: (stateName: string | null) => void;
}
export const selectedStateContext = React.createContext<SelectedState>({
    stateName: null,
    selectState: noop,
});

export type EveryContext = [typeof l2dContext, typeof selectedStateContext];
export const everyContext = joinContext<EveryContext>([l2dContext, selectedStateContext]);
