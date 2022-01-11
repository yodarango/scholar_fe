// core
import React from "react";

// styles
import postReactionStyles from "../../styles/buttons/PostReactions.module.css";

export type Tcomment = {
   ID: string;
   body: string;
   creator_avatar: string;
   creator_signature: string;
   creator_approval_rate: string;
   posted_on: string;
};
export type Tapprovals = {
   average_count: number;
   total_count: number;
};

type TpostReactionsProps = {
   handleComment?: any;
   handleRateContent?: any;
   handleMore?: any;
   comments: number;
   approvals: Tapprovals;
};

const PostReactions = ({
   handleComment,
   handleRateContent,
   handleMore,
   comments,
   approvals
}: TpostReactionsProps) => {
   return (
      <div className={postReactionStyles.mainWrapper}>
         {handleComment && (
            <div className={postReactionStyles.commentWrapper}>
               <span className={postReactionStyles.commentAmount}>{comments}</span>
               <span className={postReactionStyles.commentIcon} onClick={handleComment}></span>
            </div>
         )}
         {handleRateContent && (
            <div className={postReactionStyles.approveWrapper}>
               <span className={postReactionStyles.approvals}>{approvals.total_count}</span>
               {approvals.total_count == 0 && (
                  <span
                     className={postReactionStyles.aprovalsIcon}
                     onClick={handleRateContent}></span>
               )}
               {approvals.average_count >= 97 && (
                  <span
                     className={`${postReactionStyles.reliabilityA}`}
                     onClick={handleRateContent}>
                     A+
                  </span>
               )}
               {approvals.average_count >= 94 && approvals.average_count < 97 && (
                  <span
                     className={`${postReactionStyles.reliabilityA}`}
                     onClick={handleRateContent}>
                     A
                  </span>
               )}
               {approvals.average_count >= 90 && approvals.average_count < 94 && (
                  <span
                     className={`${postReactionStyles.reliabilityA}`}
                     onClick={handleRateContent}>
                     A-
                  </span>
               )}
               {approvals.average_count >= 87 && approvals.average_count < 90 && (
                  <span
                     className={`${postReactionStyles.reliabilityB}`}
                     onClick={handleRateContent}>
                     B+
                  </span>
               )}
               {approvals.average_count >= 83 && approvals.average_count < 87 && (
                  <span
                     className={`${postReactionStyles.reliabilityB}`}
                     onClick={handleRateContent}>
                     B
                  </span>
               )}
               {approvals.average_count >= 80 && approvals.average_count < 83 && (
                  <span
                     className={`${postReactionStyles.reliabilityB}`}
                     onClick={handleRateContent}>
                     B-
                  </span>
               )}
               {approvals.average_count >= 77 && approvals.average_count < 80 && (
                  <span
                     className={`${postReactionStyles.reliabilityC}`}
                     onClick={handleRateContent}>
                     C+
                  </span>
               )}
               {approvals.average_count >= 73 && approvals.average_count < 77 && (
                  <span
                     className={`${postReactionStyles.reliabilityC} `}
                     onClick={handleRateContent}>
                     C
                  </span>
               )}
               {approvals.average_count >= 70 && approvals.average_count < 73 && (
                  <span
                     className={`${postReactionStyles.reliabilityC}`}
                     onClick={handleRateContent}>
                     C-
                  </span>
               )}
               {approvals.average_count >= 67 && approvals.average_count < 70 && (
                  <span
                     className={`${postReactionStyles.reliabilityC}`}
                     onClick={handleRateContent}>
                     D+
                  </span>
               )}
               {approvals.average_count > 60 && approvals.average_count < 67 && (
                  <span
                     className={`${postReactionStyles.reliabilityC}`}
                     onClick={handleRateContent}>
                     D
                  </span>
               )}
               {approvals.average_count <= 60 && approvals.average_count > 0 && (
                  <span
                     className={`${postReactionStyles.reliabilityF}`}
                     onClick={handleRateContent}>
                     F
                  </span>
               )}
            </div>
         )}
         {handleMore && (
            <div className={postReactionStyles.moreWrapper}>
               <span className={postReactionStyles.moreIcon} onClick={handleMore}></span>
            </div>
         )}
      </div>
   );
};

export default PostReactions;
