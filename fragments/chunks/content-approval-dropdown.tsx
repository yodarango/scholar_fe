// core
import { useState } from "react";

// graphql
import client from "../../apollo-client";
import { CREATE_COMMENTARY_APPROVAL } from "../../graphql/posts/approvals";

// childs comps
import NotificationPopup from "../notification-popup";

// styles
import contentApprovalStlyes from "../../styles/fragments/chunks/ContentApprovalDorpdown.module.css";

type TcontentApprovalDropdownProps = {
   handleCloseApprovalDropdown: React.MouseEventHandler;
   additionalClassOne?: any;
   additionalClassTwo?: any;
   additionalClassThree?: any;
   post_id: {
      comment?: string;
      thought?: string;
      quote?: string;
   };
   successfulApproval: any;
};
const ContentApprovalDropdown = ({
   handleCloseApprovalDropdown,
   additionalClassOne,
   additionalClassTwo,
   additionalClassThree,
   post_id,
   successfulApproval
}: TcontentApprovalDropdownProps) => {
   const [notificationPopUpState, setNotificationPopUpState] = useState<boolean | JSX.Element>(
      false
   );
   const handleReateContnet = async (rating: number) => {
      // if the content is a commentary call this function
      if (post_id.comment) {
         const { data } = await client.mutate({
            mutation: CREATE_COMMENTARY_APPROVAL,
            variables: {
               USER_ID: 1,
               COMMENTARY_ID: post_id,
               approval_rate: rating
            }
         });
         if (data.rate_commentary) {
            successfulApproval();
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
      }

      // if the content is thought call this function
      if (post_id.comment) {
         const { data } = await client.mutate({
            mutation: CREATE_COMMENTARY_APPROVAL,
            variables: {
               USER_ID: 1,
               COMMENTARY_ID: post_id,
               approval_rate: rating
            }
         });
         if (data.rate_commentary) {
            successfulApproval();
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
      }

      // if the content is a quote call this function
      if (post_id.comment) {
         const { data } = await client.mutate({
            mutation: CREATE_COMMENTARY_APPROVAL,
            variables: {
               USER_ID: 1,
               COMMENTARY_ID: post_id,
               approval_rate: rating
            }
         });
         if (data.rate_commentary) {
            successfulApproval();
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
      }
   };
   return (
      <>
         {notificationPopUpState}
         <div className={`${additionalClassOne} ${contentApprovalStlyes.mianWrapper}`}>
            <section className={`${additionalClassTwo} ${contentApprovalStlyes.listWrapper}`}>
               <span
                  className={`${contentApprovalStlyes.listWrapper_a} ${additionalClassThree}`}
                  onClick={() => handleReateContnet(100)}>
                  A+
               </span>
               <span
                  className={`${contentApprovalStlyes.listWrapper_a} ${additionalClassThree}`}
                  onClick={() => handleReateContnet(94)}>
                  A
               </span>
               <span
                  className={`${contentApprovalStlyes.listWrapper_a} ${additionalClassThree}`}
                  onClick={() => handleReateContnet(90)}>
                  A-
               </span>
               <span
                  className={`${contentApprovalStlyes.listWrapper_b} ${additionalClassThree}`}
                  onClick={() => handleReateContnet(87)}>
                  B+
               </span>
               <span
                  className={`${contentApprovalStlyes.listWrapper_b} ${additionalClassThree}`}
                  onClick={() => handleReateContnet(83)}>
                  B
               </span>
               <span
                  className={`${contentApprovalStlyes.listWrapper_b} ${additionalClassThree}`}
                  onClick={() => handleReateContnet(80)}>
                  B-
               </span>
               <span
                  className={`${contentApprovalStlyes.listWrapper_c} ${additionalClassThree}`}
                  onClick={() => handleReateContnet(77)}>
                  C+
               </span>
               <span
                  className={`${contentApprovalStlyes.listWrapper_c} ${additionalClassThree}`}
                  onClick={() => handleReateContnet(73)}>
                  C
               </span>
               <span
                  className={`${contentApprovalStlyes.listWrapper_c} ${additionalClassThree}`}
                  onClick={() => handleReateContnet(70)}>
                  C-
               </span>
               <span
                  className={`${contentApprovalStlyes.listWrapper_d} ${additionalClassThree}`}
                  onClick={() => handleReateContnet(67)}>
                  D
               </span>
               <span
                  className={`${contentApprovalStlyes.listWrapper_f} ${additionalClassThree}`}
                  onClick={() => handleReateContnet(60)}>
                  F
               </span>
               <span
                  className={contentApprovalStlyes.listWrapper_cancel}
                  onClick={handleCloseApprovalDropdown}>
                  Cancel
               </span>
            </section>
         </div>
      </>
   );
};

export default ContentApprovalDropdown;
