import { useEffect, useState } from "react";

// comps
import { PostComment } from "../../../fragments/cards/posts/post_comment";
import { SmallLoader } from "../../../fragments/chunks/small_loader";
import { RoundLoader } from "../../../fragments/chunks/round_loader";
import { ResourceNotFoundError } from "../../../fragments/chunks/error_resource_not_found";
import { Primary } from "../../../fragments/buttons/primary";

// styles
import styles from "./post_comments_wrapper.module.css";

//types
import { TComment } from "../../../../types/posts_content";
import { EnumContentType } from "../../../../types/enums";
import {
   getPostComments,
   TgetPostComments
} from "../../../../helpers/functions/posts/content_get_commets";

// constants
import { CONTENT_COMMENTS_LAST_ID } from "../../../../constants/defaults";
import { deleteContentComment } from "../../../../helpers/functions/posts/commentary_delete";

type TPostCommentsWrapperProps = {
   newPost: any;
   postId: string | number;
   contentType: EnumContentType;
   cta: {
      handleDelete: () => void;
   };
};

const SHOW_LOAD_MORE = 20;
export const PostCommentsWrapper = ({
   postId,
   contentType,
   newPost,
   cta
}: TPostCommentsWrapperProps) => {
   // state
   const [loading, setloading] = useState("loading");
   const [commentArr, setCommentsArr] = useState<TComment[] | null>([]);
   const [showLoadMore, setshowLoadMore] = useState("none");

   const getData = async (variables: TgetPostComments) => {
      try {
         const { data, status } = await getPostComments(variables, contentType);
         if (data) setCommentsArr(data);
         else setCommentsArr([]);
         setloading(status);
         setshowLoadMore(data.length === SHOW_LOAD_MORE ? "done" : "error");
      } catch (error) {
         setCommentsArr([]);
         console.error(error);
         setloading("error");
      }
   };

   const getMore = async (last_id: string | number) => {
      setshowLoadMore("loading");
      try {
         const { data, status } = await getPostComments({ POST_ID: postId, last_id }, contentType);
         if (data) setCommentsArr((prev) => prev && [...prev, ...data]);
         setloading(status);
         setshowLoadMore(data.length === SHOW_LOAD_MORE ? "done" : "error");
      } catch (error) {
         console.error(error);
         setloading("error");
      }
   };

   useEffect(() => {
      getData({ POST_ID: postId, last_id: CONTENT_COMMENTS_LAST_ID });
   }, []);

   // update the comment when a new post is made
   useEffect(() => setCommentsArr((prev) => prev && [...prev, newPost]), [newPost]);

   // will only run if the post was deleted successfully
   const handleDelete = async (id: string | number, type: EnumContentType) => {
      try {
         const isDeleted = await deleteContentComment(id, type);
         if (isDeleted) {
            const updatedArr = commentArr?.filter((post) => post.ID !== id);
            setCommentsArr(updatedArr || []);
            cta.handleDelete();
         }
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <div className={styles.mainWrapper}>
         {loading === "done" && commentArr && (
            <div className={styles.carrousel}>
               {commentArr.map((comment: TComment, index: number) => (
                  <div className={styles.comment} key={index}>
                     <PostComment
                        postHeader={{
                           username: comment?.creator_signature,
                           avatar: comment?.creator_avatar,
                           userId: comment?.creator_id,
                           postId: comment?.POST_ID || "",
                           userAuthority: comment?.creator_authority_level,
                           postType: "1",
                           widthTimeStamp: {
                              time: comment?.created_date || "",
                              niceTime: comment?.posted_on || "",
                              quiet: false
                           }
                        }}
                        comment={comment?.body}
                        cta={{ handleDelete: () => handleDelete(comment.ID, contentType) }}
                     />
                  </div>
               ))}
            </div>
         )}
         {commentArr && (
            <div className={styles.loadMoreButton}>
               {showLoadMore === "done" && (
                  <Primary
                     type='1'
                     title='Load more'
                     cta={{ handleClick: () => getMore(commentArr[commentArr.length - 1].ID) }}
                  />
               )}
               {showLoadMore === "loading" && <SmallLoader />}
            </div>
         )}
         {loading === "loading" && (
            <div className={styles.loader}>
               <RoundLoader />
            </div>
         )}
         {/* #NEEDS GRAPHICS */}
         {loading === "error" && (
            <div className={styles.error}>
               <ResourceNotFoundError />
            </div>
         )}
      </div>
   );
};
