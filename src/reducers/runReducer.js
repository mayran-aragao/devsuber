const initialState = {
    runs:[]
};

export default (state =initialState ,action) => {
    let runs = [...state.runs];
    switch(action.type) {
        case 'SET_RUN':
            runs.push(action.payload.run);
            return {...state,runs};
            break;
        
    }


    return state;
}