import * as React from 'react';

import * as l2d from './model/l2d';
import { noop, zip } from './misc';

interface ProvidersProps {
    values: any;
    children: any;
}
export const createProviders =
    (contexts: React.Context<any>[]) =>
    ({ values, children }: ProvidersProps) => {
    const items = zip(contexts, values);
    return items.reduce<React.ReactElement<any> | null>((prev, curr) => {
        const [ context, value ] = curr;
        const { Provider } = context;
        return <Provider value={value}>{ prev || children }</Provider>;
    }, null);
};
interface ConsumerProps {
    children: (values: any[]) => React.ReactNode;
}
export const createConsumers =
    (contexts: React.Context<any>[]) =>
    ({ children }: ConsumerProps) => {
    return (contexts.reduce<React.ReactNode>((prev, curr) => {
        const { Consumer } = curr;
        return (values: any) => <Consumer>{ value => (prev as any || children)([value, ...values]) }</Consumer>;
    }, null) as any)([]);
};

export const l2dContext = React.createContext<l2d.L2d>({ version: 'p0', states: [] });

export interface SelectedState {
    stateName: string | null;
    selectState: (stateName: string | null) => void;
}
export const selectedStateContext = React.createContext<SelectedState>({
    stateName: null,
    selectState: noop,
});
