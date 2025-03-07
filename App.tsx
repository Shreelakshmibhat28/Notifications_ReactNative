import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useLocalNotifications } from "./useLocalNotifications";

export default function App() {
  const { notification, scheduleNotification } = useLocalNotifications();

  return (
    <View style={styles.container}>
      <Text>Local Notification App</Text>
      <Button title="SEND NOTIFICATION" onPress={scheduleNotification} />
      {notification && (
        <View style={styles.notificationDetails}>
          <Text>Notification Received:</Text>
          <Text>Title: {notification.request.content.title}</Text>
          <Text>Body: {notification.request.content.body}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  notificationDetails: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});