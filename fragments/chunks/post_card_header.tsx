// comps
import { Icon } from "./icons";
import { UserAvatarWUsername } from "./user_avatar_w_username";

// styles
import styles from "./post_card_header.module.css";
import { CategoryTag } from "./category_tag";

type TCommentaryCardHeaderProps = {
   username: string;
   avatar: string;
   userId: string;
   userAuthority: number;
   withCategoryTag?: string;
   cta: {
      handleShowCategoryMeta?: (id: string) => void;
      handleShowPostOptions: React.MouseEventHandler<HTMLDivElement>;
   };
};
export const PostCardHeader = ({
   username,
   avatar,
   userId,
   userAuthority,
   withCategoryTag,
   cta
}: TCommentaryCardHeaderProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.user}>
            <UserAvatarWUsername
               username={username}
               userId={userId}
               avatarSrc={avatar}
               quiet={false}
               userAuthority={userAuthority}
               avatarSize='2rem'
            />
         </div>

         <div className={styles.icon} onClick={cta.handleShowPostOptions}>
            <Icon name='ellipsisH' size='2rem' color='#F1EAFF' />
         </div>

         {/* ------------------ include / exlude category tag ------------  */}
         {withCategoryTag && cta.handleShowCategoryMeta && (
            <div className={styles.category}>
               <CategoryTag
                  id={withCategoryTag}
                  cta={{ handleShowCategoryMeta: cta.handleShowCategoryMeta }}
                  customSize={true}
                  customBorderRadius='.5em'
               />
            </div>
         )}
      </div>
   );
};