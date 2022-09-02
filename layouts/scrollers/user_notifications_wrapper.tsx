import { useState } from "react";

// components
import { UserNotifications } from "../../fragments/cards/user_notification";

// styles
import styles from "./user_notifications_wrapper.module.css";

// types
import { TUserNotification } from "../../types/account";

export const UserNotificationsWrapper = () => {
   // state
   const [notifications, setnotifications] = useState<TUserNotification[]>([
      { ID: "2343", body: "abc", postId: "2343", postType: 0 },
      { ID: "2343", body: "abc", postId: "2343", postType: 1 },
      { ID: "2343", body: "abc", postId: "2343", postType: 2 },
      { ID: "2343", body: "abc", postId: "2343", postType: 3 }
   ]);
   const handleGetNotifications = () => {
      // fetch notifications
   };

   return (
      <div className={styles.mainWrapper}>
         {notifications.map((notification: TUserNotification, index: number) => (
            <div key={index} className={styles.notification}>
               <UserNotifications
                  ID={notification.ID}
                  body={notification.body}
                  postId={notification.postId}
                  postType={notification.postType}
               />
            </div>
         ))}
      </div>
   );
};
