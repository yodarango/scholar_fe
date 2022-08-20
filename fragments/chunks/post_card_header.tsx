/************************************************************************************************** 
-  A small component used on the header of the post card.
-  Not very flexible or customizable. However user can decide whether to show the category tag or
   not by passign the withCategoryTag prop
***************************************************************************************************/

import { useState } from "react";

// comps
import { Icon } from "./icons";
import Portal from "../../hoc/potal";
import { UserAvatarWUsername } from "./user_avatar_w_username";
import { CategoryTag } from "./category_tag";
import { SelectpostOptions } from "../../layouts/menus/select_post_options";

// styles
import styles from "./post_card_header.module.css";

type TCommentaryCardHeaderProps = {
   username: string;
   avatar: string;
   userId: string;
   postId: string;
   userAuthority: number;
   withCategoryTag?: string;
   postType: string;
   categoryId: string;
   fontColor: string;
};
export const PostCardHeader = ({
   username,
   avatar,
   userId,
   postId,
   userAuthority,
   withCategoryTag,
   postType,
   categoryId,
   fontColor
}: TCommentaryCardHeaderProps) => {
   // state
   const [showPostOptions, setshowPostOptions] = useState<boolean>(false);

   return (
      <div className={styles.mainWrapper}>
         <Portal>
            {showPostOptions && (
               <SelectpostOptions
                  postid={postId}
                  postType={postType}
                  cta={{ handleCloseModal: () => setshowPostOptions(false) }}
               />
            )}
         </Portal>
         {console.log(fontColor)}
         <div className={styles.user}>
            {fontColor && (
               <UserAvatarWUsername
                  username={username}
                  userId={userId}
                  avatarSrc={avatar}
                  quiet={false}
                  userAuthority={userAuthority}
                  avatarSize='2rem'
                  fontColor={fontColor}
               />
            )}
            {!fontColor && (
               <UserAvatarWUsername
                  username={username}
                  userId={userId}
                  avatarSrc={avatar}
                  quiet={false}
                  userAuthority={userAuthority}
                  avatarSize='2rem'
               />
            )}
         </div>

         <div className={styles.icon} onClick={() => setshowPostOptions(true)}>
            <Icon
               name='ellipsisH'
               size='2rem'
               color={categoryId === "GRN" || categoryId === "YLW" ? "#2A2438" : "#F1EAFF"}
            />
         </div>

         {/* ------------------ include / exlude category tag ------------  */}
         {withCategoryTag && (
            <div className={styles.category}>
               <CategoryTag
                  id={withCategoryTag}
                  informativeOnly={true}
                  customSize={true}
                  customBorderRadius='.5em'
               />
            </div>
         )}
      </div>
   );
};
