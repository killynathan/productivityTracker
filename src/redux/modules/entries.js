// Action types

const ADD = 'entries/ADD';
const INCREMENT = 'entries/INCREMENT';

// Reducer helpers

const createNewEntry = (_finishedSessions, _dateString) => ({
  dateString: _dateString,
  finishedSessions: _finishedSessions
})

// Reducer

const reducer = (state = [], action) => {
    switch(action.type) {
      case ADD:
        return [
          ...state,
          createNewEntry(0, action.dateString)
        ];
      case INCREMENT:
        return state.map((entry, i) => {
          if (i === state.length - 1) {
            return createNewEntry(entry.finishedSessions + 1, entry.dateString);
          }
          return entry;
        });
      default:
        return state;
    }
}

export default reducer;

// Action Reducers

export const addEntry = (_dateString) => ({
  type: ADD,
  dateString: _dateString
});

export const incrementCompletedSessions = () => ({
  type: INCREMENT
});
