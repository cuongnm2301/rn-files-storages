import { IModule } from 'redux-dynamic-modules';

interface IFirstState {
    value: number;
}

const initialState = {
    value: 0,
};

function firstReducer(state = initialState, action) {
    switch (action.type) {
        case 'increment':
            return { ...state, value: state.value + 1 };
        case 'decrement':
            return { ...state, value: state.value - 1 };
        case 'incrementByAmount':
            return { ...state, value: state.value + action.payload };
        default:
            return state;
    }
}

export function getFirstModule(): IModule<IFirstState> {
    return {
        id: 'first',
        reducerMap: {
            first: firstReducer,
        },
    };
}
