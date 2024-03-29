// comps
import { PostComment } from "./chunks/post_comment";
import { PostRating } from "./chunks/post_rating";

// styles
import styles from "./post_reactions.module.css";

// types
import { EnumContentType } from "../../types/enums";

type TPostReactionsProps = {
   userId: string | number;
   postId: string | number;
   contentType: EnumContentType;
   dark?: boolean;
   postRating: {
      totalCount: number;
      averageCount: number;
   };
   totalComments: number;
   iconColor?: string;
};

export const PostReactions = ({
   postRating,
   dark,
   totalComments,
   iconColor,
   contentType,
   postId,
   userId
}: TPostReactionsProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div>
            <PostRating
               contentType={contentType}
               userId={userId}
               postId={postId}
               iconColor={iconColor}
               rating={{
                  totalCount: postRating.totalCount,
                  averageCount: postRating.averageCount
               }}
            />
         </div>
         <div>
            <PostComment
               comments={totalComments}
               iconColor={iconColor}
               contentType={contentType}
               postId={postId}
               userId={userId}
            />
         </div>
      </div>
   );
};
