import React from 'react';
import { connect } from 'react-redux';
import { addEntry } from '../../redux/modules/entries';

const mapStateToProps = state => ({
  entries: state.entries
});

const mapDispatchToProps = dispatch => ({
  onNewEntryClick: dateString => {
    dispatch(addEntry(dateString));
  }
});

const getCurrentEntrysCompletions = (entries) => {
  if (entries.length === 0) {
    return 0;
  }
  return entries[entries.length - 1].finishedSessions;
}

let Analytics = ({ entries, onNewEntryClick }) => (
  <div>
    <p>Analytics</p>
    <button
      onClick={() => onNewEntryClick((new Date()).toDateString())}
    >
      New Day
    </button>
    <p>Completed sessions today: {getCurrentEntrysCompletions(entries)}</p>
    <ul>
      {entries.map(entry =>
        <div>
          <p>{entry.dateString}: {entry.finishedSessions}</p></div>)}
    </ul>
  </div>
)

Analytics = connect(
  mapStateToProps,
  mapDispatchToProps
)(Analytics);

export default Analytics;
