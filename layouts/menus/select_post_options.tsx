/*****************************************************************************************
 - options for a post include:
   -  Report: handles posting to DB from this component
   -  Share: copies link to the client's clipboard
   -  Edit: redirects to the edit/ID page
   -  Delte: handles deleting the post from this comp and if succeeds it sends the ID to 
      parent so it can remove post from array
 /****************************************************************************************/

import Link from "next/link";
import { useState } from "react";

// comps
import { MenuPrimaryOption } from "../../fragments/buttons/menu_primary_option";
import { MenuPrimaryOptionWithSubSelection } from "../../fragments/buttons/menu_primary_option_w_sub_selection";
import { Icon } from "../../fragments/chunks/icons";
import { Notification } from "../../fragments/popups/notification";
import { PrimaryMenuBkg } from "../../fragments/popups/primary_menu_bkg";

// styles
import styles from "./select_menu_global.module.css";

// data
import { notificationMessages } from "../../data/notification_messages";

// helpers
import { copyToClipboard } from "../../helpers/copy_text_to_clipboard";

export type TSelectpostOptionsProps = {
   postid: string;
   postType: string;
   cta: {
      handleCloseModal: () => void;
      handleDelete: (id: string) => void;
   };
};

export const SelectpostOptions = ({ cta, postid, postType }: TSelectpostOptionsProps) => {
   const [showNotification, setshowNotification] = useState<string>("copy");

   // handle reporting the post
   const handleReport = () => {};

   // handle the copy to the clipboard
   const handleSharePost = () => {
      copyToClipboard(`/posts/${postType}/edit/${postid}`, () => setshowNotification("share"));
   };

   // handle delete the post and send ID to the parent
   const handleSelection = (selection: string) => {
      // handle deletion
      console.log(selection, postid);
      cta.handleDelete(postid);
   };

   return (
      <>
         {showNotification === "share" && (
            <Notification
               title={notificationMessages.urlCopied.title}
               body={notificationMessages.urlCopied.body}
               type='2'
               cta={() => setshowNotification("none")}
            />
         )}
         <PrimaryMenuBkg
            color='1'
            cta={cta.handleCloseModal}
            content={
               <>
                  {/* ------------- Report the post ------------ */}
                  <div className={styles.menuOption} key={1}>
                     <MenuPrimaryOptionWithSubSelection
                        type='1'
                        textType='text'
                        iconType='icon'
                        cta={{ handleSelection: handleReport }}
                        optionProperties={{
                           icon: <Icon name='warning' color='#F1EAFF' size='2rem' />,
                           iconShadow: "#F1EAFF",
                           text: "Report"
                        }}
                     />
                  </div>

                  {/* ------------- Copy post link to clipboard to share ------------ */}
                  <div className={styles.menuOption} key={2}>
                     <MenuPrimaryOption
                        textType='text'
                        iconType='icon'
                        optionProperties={{
                           icon: <Icon name='share' color='#F1EAFF' size='2rem' />,
                           iconShadow: "#F1EAFF",
                           text: "Share"
                        }}
                        cta={handleSharePost}
                     />
                  </div>
                  {/* ------------- Redirect to the edit page ------------ */}
                  <div className={styles.menuOption} key={3}>
                     <Link href={`/posts/${postType}/edit/${postid}`}>
                        <a>
                           <MenuPrimaryOption
                              textType='text'
                              iconType='icon'
                              optionProperties={{
                                 icon: <Icon name='edit' color='#F1EAFF' size='2rem' />,
                                 iconShadow: "#F1EAFF",
                                 text: "Edit"
                              }}
                              cta={() => {}}
                           />
                        </a>
                     </Link>
                  </div>
                  {/* ------------- delete the post ------------ */}
                  <div className={styles.menuOption} key={4}>
                     <MenuPrimaryOptionWithSubSelection
                        type='1'
                        textType='text'
                        iconType='icon'
                        cta={{ handleSelection }}
                        optionProperties={{
                           icon: <Icon name='delete' color='#ff4d62' size='2rem' />,
                           iconShadow: "#ff4d62",
                           text: "Delete",
                           descColor: "#ff4d62"
                        }}
                     />
                  </div>
               </>
            }
         />
      </>
   );
};
