const initialState = {
    value: 0,
    title: 'Second reducer',
};

function secondReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}

export function getSecondModule() {
    return {
        id: 'second',
        reducerMap: {
            second: secondReducer,
        },
    };
}
