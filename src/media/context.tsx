import * as React from 'react';

import * as l2d from './model/l2d';
import { noop, zip } from './misc';

type Value<T> = T extends React.Context<infer V> ? V : any;
type Values<T> =
    T extends [infer A] ? [Value<A>] :
    T extends [infer A, infer B] ? [Value<A>, Value<B>] :
    T extends [infer A, infer B, infer C] ? [Value<A>, Value<B>, Value<C>] :
    T extends [infer A, infer B, infer C, infer D] ? [Value<A>, Value<B>, Value<C>, Value<D>] :
    T extends [infer A, infer B, infer C, infer D, infer E] ? [Value<A>, Value<B>, Value<C>, Value<D>, Value<E>] :
    T extends [infer A, infer B, infer C, infer D, infer E, infer F] ? [Value<A>, Value<B>, Value<C>, Value<D>, Value<E>, Value<F>] :
    T extends [infer A, infer B, infer C, infer D, infer E, infer F, infer G] ? [Value<A>, Value<B>, Value<C>, Value<D>, Value<E>, Value<F>, Value<G>] :
    T extends [infer A, infer B, infer C, infer D, infer E, infer F, infer G, infer H] ? [Value<A>, Value<B>, Value<C>, Value<D>, Value<E>, Value<F>, Value<G>, Value<H>] :
    T extends [infer A, infer B, infer C, infer D, infer E, infer F, infer G, infer H, infer I] ? [Value<A>, Value<B>, Value<C>, Value<D>, Value<E>, Value<F>, Value<G>, Value<H>, Value<I>] :
    T extends [infer A, infer B, infer C, infer D, infer E, infer F, infer G, infer H, infer I, infer J] ? [Value<A>, Value<B>, Value<C>, Value<D>, Value<E>, Value<F>, Value<G>, Value<H>, Value<I>, Value<J>] :
    any[];

interface ProvidersProps<T> {
    values: Values<T>;
    children: any;
}
export function createProviders<T extends React.Context<any>[]>(contexts: T) {
    return ({ values, children }: ProvidersProps<T>) => {
        const items = zip(contexts, values as any);
        return items.reduce<React.ReactElement<any> | null>((prev, curr) => {
            const [ context, value ] = curr;
            const { Provider } = context as React.Context<any>;
            return <Provider value={value}>{ prev || children }</Provider>;
        }, null);
    };
}
interface ConsumerProps<T> {
    children: (values: Values<T>) => React.ReactNode;
}
export function createConsumers<T extends React.Context<any>[]>(contexts: T) {
    return ({ children }: ConsumerProps<T>) => {
        return (contexts.reduce<React.ReactNode>((prev, curr) => {
            const { Consumer } = curr;
            return (values: any) => <Consumer>{ value => (prev as any || children)([value, ...values]) }</Consumer>;
        }, null) as any)([]);
    };
}

export const l2dContext = React.createContext<l2d.L2d>({ version: 'p0', states: [] });

export interface SelectedState {
    stateName: string | null;
    selectState: (stateName: string | null) => void;
}
export const selectedStateContext = React.createContext<SelectedState>({
    stateName: null,
    selectState: noop,
});
