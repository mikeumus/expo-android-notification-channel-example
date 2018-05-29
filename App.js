import React from 'react';
import moment from 'moment';
import RNCalendarEvents from 'react-native-calendar-events';
import { StyleSheet, Text, View, Button } from 'react-native';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cal_auth: ''
    }
  }

  componentWillMount() {
    // Let's get access before doing anything
    RNCalendarEvents.authorizationStatus()
    .then(status => {
      // if the status was previous accepted, set the authorized status to state
      this.setState({ cal_auth: status })
      if(status === 'undetermined') {
        // if we made it this far, we need to ask the user for access
        RNCalendarEvents.authorizeEventStore()
        .then((out) => {
          if(out == 'authorized') {
            // set the new status to the auth state
            this.setState({ cal_auth: out })
          }
        })
      }
    })
    .catch(error => console.warn('Auth Error: ', error));
  }

  setTimer(){
    const newDate = new Date().toISOString();
    RNCalendarEvents.saveEvent('RAMP Lucid Timer', {
      startDate: newDate,
      endDate: moment(newDate).add(107, 'm').toISOString(),
      alarms: [{
        date: moment(newDate).add(9).toISOString(),
      }],
    })
    .then(id => {
      console.info(id);
    })
    .catch(error => console.warn('Save Event Error: ', error));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Set your RAMP Lucid Timer for 1 minute from now.</Text>
        <Button
          onPress={this.setTimer}
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
