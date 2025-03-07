import { useState, useEffect } from "react";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

export const useLocalNotifications = () => {
  const [notification, setNotification] = useState<Notifications.Notification | undefined>();

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

      Notifications.addNotificationReceivedListener((notification) => {
        console.log("Notification received:", notification); 
        setNotification(notification);
      });
    }

    configureNotifications();

    return () => {
      Notifications.removeNotificationSubscription(
        Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification);
        })
      );
    };
  }, []);

  const scheduleNotification = async () => {
    try {
      const res = await Notifications.scheduleNotificationAsync({
        content: {
          title: "Local Notification",
          body: "This is a local notification!",
          data: { data: "goes here" },
        },
        trigger: null,
        //trigger: {
          //type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
         // repeats: false,
         //seconds:5,
        //},
      });
      console.log("Notification scheduled successfully.", res); 
    } catch (error) {
      console.error("Error scheduling notification:", error);
    }
  };

  return { notification, scheduleNotification };
};