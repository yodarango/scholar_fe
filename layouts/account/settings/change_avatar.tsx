import { useState } from "react";
import { UserAvatar } from "../../../fragments/chunks/user_avatar";
import AvatarChooser from "../../../fragments/popups/avatarChooser";
import { Parragraph } from "../../../fragments/Typography/parragraph";
import Portal from "../../../hoc/potal";
import { FourthStack } from "../../stacks/templates/fourth_stack";

// styles
import styles from "./change_avatar.module.css";

type TChangeAvatarProps = {
   avatar: string;
   userAuthority: number;
};

export const ChangeAvatar = ({ avatar, userAuthority }: TChangeAvatarProps) => {
   const [showModal, setshowModal] = useState<boolean>(true);
   return (
      <div className={styles.mainWrapper}>
         {showModal && (
            <Portal>
               <FourthStack
                  title='Change avatar'
                  actionName='Back'
                  cta={{ handleClose: () => setshowModal(false) }}>
                  <AvatarChooser closeAvatarChooser={() => setshowModal(false)} />
               </FourthStack>
            </Portal>
         )}
         <div className={styles.avatar}>
            <UserAvatar
               userAuthority={userAuthority}
               customSize={true}
               src={avatar}
               cta={{ handleClick: () => setshowModal(true) }}
            />
         </div>
         <div className={styles.text}>
            <Parragraph text='Change avatar' size='main' quiet={true} align='center' />
         </div>
      </div>
   );
};
