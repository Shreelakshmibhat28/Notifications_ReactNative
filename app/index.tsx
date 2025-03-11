import React, { useEffect } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { useRouter } from 'expo-router';
import { useLocalNotifications } from "../useLocalNotifications";

export default function HomeScreen() {
  const { notificationResponse, scheduleNotification } = useLocalNotifications();
  const router = useRouter();

  useEffect(() => {
    if (notificationResponse) {
      router.push({
        pathname: '/NotificationDetails',
        params: { notificationResponse: JSON.stringify(notificationResponse) }
      });
    }
  }, [notificationResponse]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Local Notification App</Text>
      <Button title="SEND NOTIFICATION" onPress={scheduleNotification} />
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
  text: {
    marginBottom: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
});