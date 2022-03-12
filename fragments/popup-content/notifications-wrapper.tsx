// core
import React, { useEffect, useState } from "react";
import Link from "next/link";

// graphql
import client from "../../apollo-client";
import { GET_MY_NOTIFICATIONS } from "../../graphql/users/notifications";

// components

// styles
import notificationsWrapperStyles from "../../styles/fragments/popup-content/NotificationWrapper.module.css";

const NotificationsWrapper = () => {
   // ==============FUNCTION 1:    fetch all the notifications by user   =============== //
   type Tnotification = {
      ID: number;
      USER_ID: number;
      POST_ID: number;
      CONTENT_TYPE: number;
      body: string;
      icon: string;
      color: string;
      type: string;
      date?: Date;
   };

   const [notificationsState, setNotificationsState] = useState<Tnotification[]>([]);
   const fetchNotifications = async () => {
      const { data } = await client.query({
         query: GET_MY_NOTIFICATIONS,
         variables: {}
      });
      console.log(data);
      setNotificationsState(data.notifications);
   };

   useEffect(() => {
      fetchNotifications();
   }, []);

   return (
      <div className={notificationsWrapperStyles.mainWrapper}>
         {notificationsState &&
            notificationsState.map((notification: Tnotification) => (
               <div
                  className={notificationsWrapperStyles.notificationWrapper}
                  style={{ borderLeft: `.5rem solid ${notification.color}` }}>
                  <h3 className={notificationsWrapperStyles.user}>
                     {/* <Link href='/users/id'>
                        <a>{notification.user} </a>
                     </Link> */}
                  </h3>
                  <Link href='/see-post/id'>
                     <a
                        className={`${notificationsWrapperStyles.icon} std-vector-icon`}
                        style={{ backgroundImage: `url(${notification.icon})` }}></a>
                  </Link>

                  {/* <div className={notificationsWrapperStyles.reputationRapper}>
                     <Link href='/users/id'>
                        <a
                           className={notificationsWrapperStyles.avatar}
                           style={{ backgroundImage: `url(${notification.avatar})` }}></a>
                     </Link>
                  </div> */}
                  <Link href='/see-post/id'>
                     <a className={notificationsWrapperStyles.content}>
                        <p>{notification.body}</p>
                     </a>
                  </Link>
               </div>
            ))}
         {notificationsState.length === 0 && (
            <h2 className={notificationsWrapperStyles.noNotifications}>
               You have no notifications!
            </h2>
         )}
      </div>
   );
};

export default NotificationsWrapper;
