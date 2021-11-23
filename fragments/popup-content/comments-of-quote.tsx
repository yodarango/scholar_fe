//core
import React, { useState } from "react";

// components
import ConfirmationPopup from "../confirmation-popup";

// styles
import commentsOfStoryStyles from "../../styles/fragments/popup-content/CommentsOfQuote.module.css";
import cardStyles from "../../styles/components/Cards.module.css";
import { Tcomment } from "../buttons/post-reactions";

export type TcommentType = {
   id: string;
   userId: string;
   userAvatar: string;
   userSignature: string;
   content: string;
};

export type commentsOfQuoteProps = {
   comment: Tcomment;
};

const CommentsOfQuote = ({ comment }: commentsOfQuoteProps) => {
   // ================= FUNCTION 1: Handle the delete popup  ===================//
   const [deletePopupState, setDeletePopupState] = useState<boolean>(false);
   const handleDeleteConfirmation = () => {
      setDeletePopupState(true);
   };
   // ================= FUNCTION 1: Handle the delete popup  ===================//
   const [reportPopupState, setReportPopupState] = useState<boolean>(false);
   const handleReportConfirmation = () => {
      setReportPopupState(true);
   };
   return (
      <>
         {deletePopupState && (
            <ConfirmationPopup
               title={`Are you sure you want to delete this comment?`}
               cancel={() => setDeletePopupState(false)}
            />
         )}
         {reportPopupState && (
            <ConfirmationPopup
               title={`Are you sure you want to report this comment?`}
               cancel={() => setReportPopupState(false)}
            />
         )}
         <div className={commentsOfStoryStyles.mainWrapper}>
            <div className={commentsOfStoryStyles.avatarUserSignatureWrapper}>
               <div className={commentsOfStoryStyles.commentAvatarWrapper}>
                  <div
                     style={{ backgroundImage: `url(${comment.creator_avatar})` }}
                     className={commentsOfStoryStyles.avatar}></div>
               </div>
               <h4>{comment.creator_signature}</h4>
            </div>
            <p className={commentsOfStoryStyles.content}>{comment.body}</p>
            <div
               className={`${cardStyles.commentsOfContentActionWrapper} ${cardStyles.commentsOfQuotesActionWrapper} `}>
               <span
                  className={(cardStyles.cardIcon, cardStyles.delete)}
                  onClick={handleDeleteConfirmation}></span>
               <span className={(cardStyles.cardIcon, cardStyles.edit)}></span>
               <span
                  className={(cardStyles.cardIcon, cardStyles.report)}
                  onClick={handleReportConfirmation}></span>
            </div>
         </div>
      </>
   );
};

export default CommentsOfQuote;
