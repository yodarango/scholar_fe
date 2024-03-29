/**********************************************************************************************************
-  Content holder that is rendered directly from a page or from a high level component.
-  Allows fro customizable background. 
-  Used mainly for the user profile page.
-  if the userID is not passed the data for the user currently logged in 
**********************************************************************************************************/
import { useEffect, useState } from "react";

// comps
//import { Header } from "../../../fragments/Typography/header";
import { ToggleMenu } from "../../../fragments/chunks/toggle_menu";
import { UserStats } from "../../account/profile/user_stats";

// comps
import {
   getUserSummary,
   TgetUserSummaryVariables
} from "../../../../helpers/functions/users/get_user_summary";

// data/ types
import { TUser } from "../../../../types/user";

// styles
import styles from "./profile_art.module.css";

type TTeritaryStackprops = {
   userID?: string;
   title: string;
   icon?: string;
   hasNotifications?: boolean;
};

export const ProfileArt = ({
   title,
   icon,
   hasNotifications = false,
   userID
}: TTeritaryStackprops) => {
   const [data, setdata] = useState<TUser>({
      ID: "0",
      signature: "",
      avatar: "",
      authority_level: 1,
      total_ratings: 0,
      approval_rating: 101,
      total_posts: 0,
      has_new_notifications: false
   });

   const getData = async (variables?: TgetUserSummaryVariables) => {
      try {
         const { data } = await getUserSummary(variables);

         setdata(data);
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      if (userID === "@me") {
         getData();
      } else {
         getData({ ID: userID });
      }
   }, []);

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.gradientBkg}>
            <div className={styles.stats}>
               <UserStats user_summary={data} />
            </div>
         </div>
         <div className={styles.toggleIcon}>
            {hasNotifications && <span className={styles.notificationBadge}></span>}
            <ToggleMenu
               type={2}
               profileMenuOptions={{ userHasNotifications: data?.has_new_notifications }}
               onOpen={() => setdata((prev) => ({ ...prev, has_new_notifications: false }))}
            />
         </div>
         <div className={styles.subWrapper}></div>
      </div>
   );
};
