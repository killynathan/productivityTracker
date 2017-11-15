import React from 'react';
import { connect } from 'react-redux';
import { addEntry } from '../../redux/modules/entries';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import styled from 'styled-components';

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

const entriesToGraphData = (entries) => {
  var graphData = [];
  entries.forEach((entry) => {
    var dateObject = new Date(entry.dateString);
    var monthAsNumber = dateObject.getMonth() + 1;
    var day = dateObject.getDate()
    graphData.push({
      dateString: '' + monthAsNumber + '/' + day,
      finishedSessions: entry.finishedSessions
    })
  });
  return graphData;
}

const Title = styled.p`
  font-size: 30px;
  margin-bottom: 20px;
`;

const NewDayButton = styled.button`
  display: inline-block;
  margin-right: 5px;
  margin-bottom: 30px;
  background-color: inherit;
  color: white;
  border: 1px solid #90AFC5;
  height: 30px;
  width: 80px;
  border-radius: 5px;
  cursor: pointer;
`;

const Status = styled.p`
  display: inline-block;
  margin-bottom: 30px;
`;

let Analytics = ({ entries, onNewEntryClick }) => (
  <div style={{paddingBottom: 50}}>
    <Title>Analytics</Title>
    <NewDayButton
      onClick={() => onNewEntryClick((new Date()).toDateString())}
    >
      New Day
    </NewDayButton>
    <Status>Completed sessions today: {getCurrentEntrysCompletions(entries)}</Status>

    <LineChart width={800} height={400} data={entriesToGraphData(entries)} margin={{left: -30}} style={{margin: '0 auto'}}>
      <XAxis dataKey='dateString' stroke='white' />
      <YAxis stroke='white' />
      <CartesianGrid strokeDasharray="3 3" stroke='#696e6f'/>
      <Line type='monotone' dataKey='finishedSessions' stroke='#82ca9d' />
    </LineChart>
  </div>
)

Analytics = connect(
  mapStateToProps,
  mapDispatchToProps
)(Analytics);

export default Analytics;
