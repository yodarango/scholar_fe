// core
import { useState, useRef } from "react";

//graphql
import client from "../apollo-client";
import { OPEN_QUOTE_STORY_COMMENTS } from "../graphql/posts/quotes";
import { GET_QUOTE_APPROVALS } from "../graphql/posts/approvals";

// components
import PostReactions, { Tapprovals } from "../archive/post-reactions";
import CommentsOfQuote from "../fragments/popups/comments-of-quote";
import ContentApprovalDropdown from "../archive/content-approval-dropdown";
import NotificationPopup from "../../components/fragments/popups/notification";

// styles
import quoteStoriesStyles from "../styles/posts/QuotesStories.module.css";
import contentApprovalDDStyles from "../styles/fragments/chunks/ContentApprovalDorpdown.module.css";

// helpers
import { TsingleStory } from "./quotes-profile";
import { IvaluesCat, valuesCat } from "../data/category_meta";
import handlePostComment from "../helpers/functions/posts/quote_post_comment";

export type quoteViewProfileProps = {
   story: TsingleStory;
   handleCloseStories: React.MouseEventHandler;
};

const QuoteViewProfile = ({ story, handleCloseStories }: quoteViewProfileProps) => {
   // ==============   FUNCTION 5: commennt on the story  =============== //
   const [commentPopUpState, setCommentPopUpState] = useState<boolean>(false);
   const handleComentClick = () => {
      setCommentPopUpState(true);
   };

   // ==============   FUNCTION 7: see the stroy data when the user clicks "More" =============== //
   const [morePopUpState, setMorePopUpState] = useState<boolean>(false);
   const [commentsOfQuote, setCommentsOfQuote] = useState([]);
   const handleMoreClick = async (quote_id: string) => {
      try {
         const { data } = await client.query({
            query: OPEN_QUOTE_STORY_COMMENTS,
            variables: { ID: quote_id, showComment: true }
         });

         if (data.quote) {
            setCommentsOfQuote(data.quote[0].comments);
            setCommentsCountState(data.quote[0].comments.length);
            setMorePopUpState(true);
         } else {
            setNotificationPopUpState(
               <NotificationPopup
                  closeModal={() => setNotificationPopUpState(false)}
                  title='Oh no!'
                  contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
                  newClass='notification-wrapper--Error'
               />
            );
         }
      } catch (error) {
         console.log(error);
         setNotificationPopUpState(
            <NotificationPopup
               closeModal={() => setNotificationPopUpState(false)}
               title='Oh no!'
               contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
               newClass='notification-wrapper--Error'
            />
         );
      }
   };

   // ==============   FUNCTION 8: see the story data when the user clicks "More" =============== //
   const handleCloseComment = () => {
      setCommentPopUpState(false);
   };

   // ========================= FUNCTION 9: post the comment of the commentary ============================ //
   const commentBody = useRef<HTMLTextAreaElement>(null);
   const [postingState, setPostingState] = useState<boolean>(false);
   const [commentsCountState, setCommentsCountState] = useState<number>(
      story.comments[0].total_count
   );
   const [notificationPopUpState, setNotificationPopUpState] =
      useState<boolean | JSX.Element>(false);

   const postQuoteComment = async () => {
      if (commentBody.current && commentBody.current.value.length > 0) {
         setPostingState(true);

         try {
            const data: any = await handlePostComment(
               story.ID,
               commentBody.current.value,
               story.creator.ID
            );

            if (data === "Quote_Comment") {
               setCommentsCountState(commentsCountState + 1);
               setPostingState(false);
               setCommentPopUpState(false);
            } else if (data === "ExceedsPostCount") {
               setPostingState(false);
               setNotificationPopUpState(
                  <NotificationPopup
                     closeModal={() => setNotificationPopUpState(false)}
                     title='This is sad 😔'
                     contentString='You have exceeded the post comment count whithin a 24-hour period'
                     newClass='notification-wrapper--Error'
                  />
               );

               return;
            } else if (data === "Error") {
               setPostingState(false);
               setNotificationPopUpState(
                  <NotificationPopup
                     closeModal={() => setNotificationPopUpState(false)}
                     title='Oh no!'
                     contentString='Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!'
                     newClass='notification-wrapper--Error'
                  />
               );

               return;
            } else {
               setPostingState(false);
               setNotificationPopUpState(
                  <NotificationPopup
                     closeModal={() => setNotificationPopUpState(false)}
                     title={`You're not authorized! 👮‍♂️`}
                     contentString={
                        data.graphQLErrors
                           ? data.graphQLErrors[0]?.message
                           : "Something has gone south ⬇️ and we are performing surgery on the issue 👨‍⚕️. Please try again later!"
                     }
                     newClass='notification-wrapper--Error'
                  />
               );

               return;
            }
         } catch (error) {
            console.log(error);
         }
      }
   };

   // ================= FUNCTION 13: handle the approve click  ================== //
   const [chooseAprovalRating, setChooseAprovalRating] = useState<boolean>(false);
   const handleApproveContent = () => {
      setChooseAprovalRating(true);
   };
   // ======================== FUNCTION 13.1: hande a ssuccessful approval rating ========================= //
   const [postApprovalState, setPostApprovalState] = useState<Tapprovals>(story.approvals[0]);

   const handleSuccessfulApprovalRating = async () => {
      try {
         const { data } = await client.query({
            query: GET_QUOTE_APPROVALS,
            variables: {
               QUOTE_ID: story.ID
            }
         });
         console.log(data);
         if (data.quote_approvals) {
            setPostApprovalState(data.quote_approvals[0]);
         }
         setChooseAprovalRating(false);
      } catch (error: any) {
         setChooseAprovalRating(false);
         console.log(error);
      }
   };

   // ================ FUNCTION 14:  open categroy popup on category tag click  ================ ///
   const [tagInfoPopupState, setTagInfoPopupState] = useState<boolean | JSX.Element>(false);
   const openInfoAboutTagColor = (cat: string) => {
      const selectedTag = valuesCat.filter((obj: IvaluesCat) => obj.tag === cat);

      setTagInfoPopupState(
         <NotificationPopup
            title={selectedTag[0].title}
            closeModal={() => setTagInfoPopupState(false)}
            contentArray={selectedTag[0].subjects}
            newClass={`notification-wrapper--${selectedTag[0].title}`}
         />
      );
   };

   return (
      <>
         {notificationPopUpState}
         {tagInfoPopupState}
         <div className={quoteStoriesStyles.mainWrapper}>
            {chooseAprovalRating && (
               <ContentApprovalDropdown
                  handleCloseApprovalDropdown={() => setChooseAprovalRating(false)}
                  additionalClassOne={contentApprovalDDStyles.mianWrapper_quotes}
                  additionalClassTwo={contentApprovalDDStyles.listWrapper_quotes}
                  additionalClassThree={contentApprovalDDStyles.listWrapper_list_quotes}
                  post_id={{ quote: story.ID }}
                  user_id={story.creator.ID}
                  successfulApproval={handleSuccessfulApprovalRating}
               />
            )}
            <section className={quoteStoriesStyles.storyPostWrapper}>
               <div
                  className={`closeModal ${quoteStoriesStyles.closeModal}`}
                  onClick={handleCloseStories}>
                  X
               </div>
               <div className={`${quoteStoriesStyles.storyPost}`} id={story.background}>
                  <p className={`${quoteStoriesStyles.storyContent}`}>
                     {story.body} <span className={quoteStoriesStyles.quotationMark}></span>
                  </p>
                  <span className={quoteStoriesStyles.posted_on}>{story.posted_on}</span>
                  <p className={quoteStoriesStyles.storyBy}>{story.author}</p>
               </div>
               <div className={quoteStoriesStyles.postReactionWrapper}>
                  <PostReactions
                     handleRateContent={handleApproveContent}
                     handleComment={handleComentClick}
                     handleMore={() => handleMoreClick(story.ID)}
                     approvals={postApprovalState}
                     comments={commentsCountState}
                  />
               </div>
               {commentPopUpState && (
                  <div className={quoteStoriesStyles.commentWrapper}>
                     <h3>Type your comment</h3>
                     <textarea placeholder={"comment..."} ref={commentBody}></textarea>
                     <div className={quoteStoriesStyles.postReactionWrapperComment}>
                        {!postingState && (
                           <span className={"std-button_gradient-text"} onClick={postQuoteComment}>
                              Post
                           </span>
                        )}
                        {postingState && (
                           <span className={"std-button_gradient-text"}>Posting...</span>
                        )}
                        <span
                           className={quoteStoriesStyles.cancelButton}
                           onClick={handleCloseComment}>
                           Cancel
                        </span>
                     </div>
                  </div>
               )}
               {morePopUpState && (
                  <section className={quoteStoriesStyles.commentsOfStroyWrapper}>
                     <span
                        className={quoteStoriesStyles.closeCommentsCarrousel}
                        onClick={() => setMorePopUpState(false)}>
                        X
                     </span>
                     <CommentsOfQuote comments={commentsOfQuote} />
                     {commentsCountState <= 0 && (
                        <h3 className={quoteStoriesStyles.noCommentsYet}>
                           Be the first one to comment! 😊
                        </h3>
                     )}
                  </section>
               )}
            </section>
            <div
               className={quoteStoriesStyles.selectedTagColor}
               onClick={() => openInfoAboutTagColor(story.category_tags.split(" ")[0])}
               id={`category-${story.category_tags.split(" ")[0].replace("#", "")}`}></div>
         </div>
      </>
   );
};

export default QuoteViewProfile;