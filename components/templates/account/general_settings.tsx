/**************************************************************************************** 
-   Displays and handles updating the general settings of a user 
****************************************************************************************/

import { useEffect, useState } from "react";

// components
import { InputPrimary } from "../../fragments/inputs/input_primary";
import { SelectTrueColorPersonality } from "../../fragments/inputs/select_true_color_personality";
import { Primary } from "../../fragments/buttons/primary";
import { ResourceNotFound } from "../../common/feedback/resource_not_found";
import { RoundLoader } from "../../fragments/chunks/round_loader";
import { ChangeAvatar } from "../../layouts/account/settings/change_avatar";
import { ChangeSignature } from "../../layouts/account/settings/change_signature";
import { FourthStackHeader } from "../../layouts/stacks/headers/fourth_stack_header";

// styles
import styles from "./general_settings.module.css";

// helpers
import {
   getUserGeneralSettings,
   handleUpdateGeneralSettings,
   ThandleUpdateSettings
} from "../../../helpers/functions/users/user_settings";
import Portal from "../../hoc/potal";
import { Notification } from "../../fragments/popups/notification";
import { notificationMessages } from "../../../data/notification_messages";
import { Error } from "../../common/feedback/error";

const settingsDefaults: ThandleUpdateSettings = {
   my_true_color_personality_test: "",
   my_favorite_verse: "",
   my_favorite_color: "",
   authority_level: 0,
   my_ministry: "",
   signature: "",
   my_church: "",
   avatar: "",
   my_job: ""
};

type TGeneralSettings = {
   onGoBack: () => void;
};

export const GeneralSettings = ({ onGoBack }: TGeneralSettings) => {
   // state
   const [generalSettings, setgeneralSettings] = useState<ThandleUpdateSettings>(settingsDefaults);
   const [notification, setnotification] =
      useState<{
         title: string;
         body: string;
         type: string;
      } | null>(null);
   const [loading, setloaading] = useState<string>("loading");

   const getData = async () => {
      try {
         const { data, status } = await getUserGeneralSettings();
         setgeneralSettings(data);
         setloaading(status);
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      getData();
   }, []);

   // handle the saving
   const handleSave = async () => {
      try {
         const { data, status, error } = await handleUpdateGeneralSettings(generalSettings);
         if (data) {
            setnotification({ ...notificationMessages.settingsSaved, type: "2" });
         } else if (status === "error") {
            setnotification(error);
         }
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <div className={styles.mainWrapper}>
         {notification && (
            <Portal>
               <Notification
                  title={notification.title}
                  body={notification.body}
                  type={notification.type}
                  cta={{ handleClose: () => setnotification(null) }}
               />
            </Portal>
         )}
         <FourthStackHeader title='General' actionName='Back' cta={{ handleClose: onGoBack }} />
         {loading === "done" && (
            <>
               <div className={styles.avatar}>
                  <ChangeAvatar
                     avatar={generalSettings.avatar}
                     userAuthority={generalSettings.authority_level}
                  />
               </div>
               <div className={styles.signature}>
                  <ChangeSignature
                     signature={generalSettings.signature}
                     cta={{
                        updateSignature: (signature) => {
                           setgeneralSettings({ ...generalSettings, signature });
                        }
                     }}
                  />
               </div>
               <div className={styles.field}>
                  <InputPrimary
                     cta={{
                        handleValue: (value: string) =>
                           setgeneralSettings({ ...generalSettings, my_church: value })
                     }}
                     maxL={150}
                     placeholder='Church I attend'
                     fontSize='main'
                     type='text'
                     value={generalSettings.my_church}
                  />
               </div>
               <div className={styles.field}>
                  <InputPrimary
                     cta={{
                        handleValue: (value: string) =>
                           setgeneralSettings({ ...generalSettings, my_ministry: value })
                     }}
                     maxL={150}
                     placeholder='My ministry is'
                     fontSize='main'
                     type='text'
                     value={generalSettings.my_ministry}
                  />
               </div>
               <div className={styles.field}>
                  <InputPrimary
                     cta={{
                        handleValue: (value: string) =>
                           setgeneralSettings({ ...generalSettings, my_favorite_verse: value })
                     }}
                     maxL={150}
                     placeholder='My favorite verse'
                     fontSize='main'
                     type='text'
                     value={generalSettings.my_favorite_verse}
                  />
               </div>
               <div className={styles.field}>
                  <InputPrimary
                     cta={{
                        handleValue: (value: string) =>
                           setgeneralSettings({ ...generalSettings, my_job: value })
                     }}
                     maxL={150}
                     placeholder='My job'
                     fontSize='main'
                     type='text'
                     value={generalSettings.my_job}
                  />
               </div>
               <div className={styles.field}>
                  <InputPrimary
                     cta={{
                        handleValue: (value: string) =>
                           setgeneralSettings({ ...generalSettings, my_favorite_color: value })
                     }}
                     maxL={150}
                     placeholder='My favorite color'
                     fontSize='main'
                     type='text'
                     value={generalSettings.my_favorite_color}
                  />
               </div>
               <div className={styles.colorPersonality}>
                  <SelectTrueColorPersonality
                     label='My true color personality'
                     currColor={generalSettings.my_true_color_personality_test}
                     cta={{
                        handleSelection: (color: string) =>
                           setgeneralSettings({
                              ...generalSettings,
                              my_true_color_personality_test: color
                           })
                     }}
                  />
               </div>
               <div className={styles.button}>
                  <Primary type='1' title='Save' cta={{ handleClick: handleSave }} />
               </div>
            </>
         )}
         {loading === "loading" && (
            <div className={styles.loader}>
               <RoundLoader />
            </div>
         )}
         {loading === "error" && (
            <div className={styles.error}>
               <Error />
            </div>
         )}
      </div>
   );
};
