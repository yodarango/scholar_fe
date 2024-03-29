import { UserNotificationsWrapper } from "../../layouts/scrollers/user_content/user_notifications_wrapper";
import { SelectProfileOptions } from "../../layouts/menus/select_profile_options";
import { FONT_COLOR } from "../../../constants/tokens";
import { useLogout } from "../../../hooks/use_logout";
import { useState } from "react";

// components
import Portal from "../../hoc/potal";
import { Icon } from "./icons";

// styles
import styles from "./toggle_menu.module.css";

enum menuTypes {
   LIBRARY = 1,
   PROFILE = 2
}

type TToggleMenuProps = {
   profileMenuOptions?: {
      userHasNotifications?: boolean;
   };
   iconSize?: string;
   type: menuTypes; // library menu
   onOpen?: () => void;
};

export const ToggleMenu = ({
   iconSize = "3rem",
   type,
   profileMenuOptions,
   onOpen
}: TToggleMenuProps) => {
   // state
   const [showMenu, setshowMenu] = useState(false);
   const [showModal, setshowModal] = useState<string | null>(null);

   const hasNotifications = profileMenuOptions?.userHasNotifications === true;

   // handles the call back triggered by the menu options
   // and decides what to due with the option selected
   const handleOptionSelection = (option: string) => {
      switch (option) {
         case "notifications":
            setshowModal(option);
            break;
         case "logout":
            useLogout();
            break;
      }
   };

   return (
      <>
         <Portal>
            {/* there is no library right now to this is unecessary, in the future
               this trigger can be used to display a different set of options
               for different pages */}
            {/* {showMenu && type === 1 && (
               <SelectLibraryContent cta={{ handleCloseModal: () => setshowMenu(false) }} />
            )} */}

            {/* the menu containing all teh settings options  */}
            {showMenu && type === 2 && !showModal && (
               <SelectProfileOptions
                  userHasNotifications={hasNotifications}
                  cta={{
                     handleCloseModal: () => setshowMenu(!showMenu),
                     // this triggers the notifications modal below
                     handleShowModal: handleOptionSelection
                  }}
               />
            )}

            {/* the notifications wrapper  */}
            {showModal === "notifications" && (
               <UserNotificationsWrapper
                  title='Notifications'
                  cta={{
                     handleClose: () => {
                        setshowModal(null);
                        setshowMenu(false);
                        onOpen && onOpen();
                     }
                  }}
               />
            )}
         </Portal>
         <div className={styles.mainWrapper} onClick={() => setshowMenu(!showMenu)}>
            <Icon
               name={hasNotifications ? "menuWithDot" : "menu"}
               size={iconSize}
               color={FONT_COLOR}
            />
         </div>
      </>
   );
};
