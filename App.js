import React from 'react';
import moment from 'moment';
// import RNCalendarEvents from 'react-native-calendar-events';
import RNAlarms from 'react-native-alarms';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class App extends React.Component {
  rampEvents: Array<number> = [];
  // constructor() {
  //   super();
  //   this.state = {
  //     cal_auth: ''
  //   }
  // }

  // componentWillMount() {
    // RNCalendarEvents.authorizeEventStore()
    // .then((out) => {
    //   if (out === 'authorized') {
    //     this.setState({ cal_auth: out })
    //   }
    //  })
    //  .catch((error) => {
    //    console.warn('Auth Error: ', error);
    //  });
  // }

  // setTimer = () => {
  //   const newDate = new Date().toISOString();
  //   console.info('\n\n newDate: \n\n', newDate, '\n\n\n');
  //   RNCalendarEvents.saveEvent('RAMP Lucid Timer', {
  //     startDate: newDate,
  //     endDate: moment(newDate).add(107, 'm').toISOString(),
  //     alarms: [{
  //       // date: moment(newDate).add(9).toISOString(),
  //       date: 0
  //     }],
  //   })
  //   .then(id => {
  //     this.rampEvents.push(id);
  //     console.info('\n\n rampeEvent: \n\n', this.rampEvents, '\n\n\n');
  //   })
  //   .catch(error => console.warn('Save Event Error: ', error));
  // }

  setRampAlarm = () => {
    const newDate = new Date().toISOString();
    const firstAlarm = new Date(moment(newDate).add(16, 'm').toISOString());
    RNAlarms.alarmSetElapsedRealtimeWakeup('RAMP Alarm 1', 3);
    // RNAlarms.alarmSetRTCWakeup('RAMP Alarm 1', firstAlarm, 120000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Set your RAMP Lucid Alarm for 1 minute from now.</Text>
        <Button
          onPress={this.setRampAlarm}
          title="SET TIMER"
          color="#841584"
          accessibilityLabel="Button to set lucid RAMP timer for 1 minute from now"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
