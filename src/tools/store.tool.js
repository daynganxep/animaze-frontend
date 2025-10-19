import set from 'lodash/set';
import get from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';

export function setStates(defaultValue) {

    return function (state, { payload }) {
        const { field, value, reset } = payload;
        if (reset) {
            set(state, field, cloneDeep(get(cloneDeep(defaultValue), field)));
        } else {
            set(state, field, value);
        }
    }
}