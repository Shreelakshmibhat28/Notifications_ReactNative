import { useState, useEffect } from "react";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { useRouter } from 'expo-router';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

export const useLocalNotifications = () => {
  const [notification, setNotification] = useState<Notifications.Notification | undefined>();
  const [notificationResponse, setNotificationResponse] = useState<Notifications.NotificationResponse | undefined>();
  const router = useRouter();

  useEffect(() => {
    async function configureNotifications() {
      const { status } = await Notifications.requestPermissionsAsync();
      console.log("Notification permission status:", status); 
      if (status !== "granted") {
        console.warn("Notification permissions not granted!");
        return;
      }

      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
        console.log("Notification channel created."); 
      }

      const notificationListener = Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification received:", notification); 
        setNotification(notification);
      });

      const responseListener = Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification response received:", response);
        setNotificationResponse(response);
        router.push({
          pathname: '/NotificationDetails',
          params: { notificationResponse: JSON.stringify(response) }
        });
      });

      return () => {
        Notifications.removeNotificationSubscription(notificationListener);
        Notifications.removeNotificationSubscription(responseListener);
      };
    }

    configureNotifications();
  }, []);

  const scheduleNotification = async () => {
    try {
      const res = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Local Notification",
          body: "Hello shree!!",
          data: { Data: "goes here" },
        },
        trigger: null,
      });
      console.log("Notification scheduled successfully.", res); 
    } catch (error) {
      console.error("Error scheduling notification:", error);
    }
  };

  return { notification, notificationResponse, scheduleNotification };
};