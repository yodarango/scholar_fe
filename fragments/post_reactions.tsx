// comps
import { PostComment } from "./chunks/post_comment";
import { PostRating } from "./chunks/post_rating";

// styles
import styles from "./post_reactions.module.css";

type TPostReactionsProps = {
   postRating: {
      totalCount: number;
      averageCount: number;
   };
   totalComments: number;
   iconColor?: string;
};

export const PostReactions = ({ postRating, totalComments, iconColor }: TPostReactionsProps) => {
   return (
      <div className={styles.mainWrapper}>
         <div>
            <PostRating
               iconColor={iconColor}
               rating={{
                  totalCount: postRating.totalCount,
                  averageCount: postRating.averageCount
               }}
            />
         </div>
         <div>
            <PostComment comments={totalComments} iconColor={iconColor} />
         </div>
      </div>
   );
};
