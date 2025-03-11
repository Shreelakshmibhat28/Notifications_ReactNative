import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SearchParams } from 'expo-router';
import { useSearchParams } from "expo-router/build/hooks";

export default function NotificationDetails() {
  const searchParams = useSearchParams();
  const notificationResponse = searchParams.get('notificationResponse');
  const response = notificationResponse ? JSON.parse(notificationResponse) : {};

  return (
    <View style={styles.container}>
      <Text style = {styles.title}>Notification Received!!</Text>
      <Text style = {styles.text}>Title: {response.notification.request.content.title}</Text>
      <Text style = {styles.text}>Body: {response.notification.request.content.body}</Text>
      
      {Object.entries(response.notification.request.content.data).map(([key, value]) => (
        <Text key={key} style = {styles.text}>{`${key}: ${value}`}</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    
  },
  title : {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },

  text : {
    fontSize: 18,
    fontVariant: ['tabular-nums'],
    marginBottom: 10,
  }
});