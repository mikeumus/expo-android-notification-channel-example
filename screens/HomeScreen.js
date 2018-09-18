import React, { Component } from 'react';
import { Platform, View, StyleSheet, Button, Alert } from 'react-native';
import { Constants, Notifications, Permissions } from 'expo';

async function getiOSNotificationPermission() {
  const { status } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  if (status !== 'granted') {
    return;
  }
}

export default class HomeScreen extends Component {
  _handleButtonPress = () => {
    const localnotification = {
      title: 'Notification!',
      body: 'This is your affirmation to dream lucidly.',
      data: {
        thisIsYourData: 'your data',
      },
      android: {
        channelId: 'alarm',
      },
      ios: {
        sound: true,
      },
    };
    let sendAfterFiveSeconds = Date.now();
    sendAfterFiveSeconds += 5000;

    const schedulingOptions = { time: sendAfterFiveSeconds };
    Notifications.scheduleLocalNotificationAsync(
      localnotification,
      schedulingOptions
    );
  };
  listenForNotifications = () => {
    Notifications.addListener(
      this._handleNotification
    )
  };

  _handleNotification = ({ origin, data, remote }) => {
    let type = remote ? 'Push' : 'Local'
    let info = `${type} notification ${origin} with data: ${JSON.stringify(data)}`
    Alert.alert('Notification!', info)
  }

  async componentDidMount() {
    if (Platform.OS === 'android') {
      Expo.Notifications.createChannelAndroidAsync('alarm', {
        name: 'Alarms',
        priority: 'max',
        vibrate: [0, 250, 250, 250],
        sound: true,
      });
    }
    await getiOSNotificationPermission();
    this.listenForNotifications();
  }
  render() {
    return (
      <View style={styles.container}>

        <Button
          title="Send a notification in 5 seconds!"
          onPress={this._handleButtonPress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  }
});
