export const noop = () => {};
export const zip = <A, B>(a: Array<A>, b: Array<B>): Array<[A,B]> => {
    const result: Array<[A,B]> = [];
    const length = Math.min(a.length, b.length);
    for (let i = 0; i < length; ++i) result.push([ a[i], b[i] ]);
    return result;
};
