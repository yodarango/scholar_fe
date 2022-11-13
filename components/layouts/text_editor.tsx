
/**************************************************************************************** 
- renders the a text editor for either the thought or commentary type.
- if cta.closeModal is passed than the "x" button will be rendered and called on Click()
- if closeModalHref is passed then the modal will redirect to the route specified in the 
   router.query.close prop
****************************************************************************************/

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// components
import { TextEditorTextArea } from "../fragments/inputs/text_editor_text_area";
import { TextEditorActions } from "./text_editor_actions";
import { CloseContent } from "../fragments/buttons/close_content";

//styles
import styles from "./text_editor.module.css";
import { VerseRefTagWrapper } from "../fragments/verse_ref_tag_wrapper";

// helpers / types

type TTextEditorProps = {
   body: string | null;
   postImage: string;
   userAuthority: number;
   userId: string;
   username: string;
   avatar: string;
   postPostedOnDate: string;
   postCreatedDate: string;
   postCategory: string;
   postReferences: string[];
   postPrivacy: boolean;
   withTitle?: boolean;
   titleMaxL?: number;
   titleDefaultValue?: string;
   titlePlaceHolder?: string;
   closeModalHref?: string | undefined;
   cta: {
      handleCategorySelection: (category: string) => void;
      handlePrivacySelection: (privacy: boolean) => void;
      handleRefVerseSelection: (verse: string) => void;
      handlePost: (body?: any) => void;
      handleBody: (body: string) => void;
      handleReferencedVerses: (verses: string[]) => void;
      handleTitleValue?: (title: string) => void;
      handleCloseModal?: () => void;
   };
};

export const TextEditor = ({
   body,
   postImage,
   userAuthority,
   userId,
   username,
   avatar,
   postPostedOnDate,
   postCreatedDate,
   postCategory,
   postReferences,
   postPrivacy,
   titleMaxL,
   withTitle,
   titleDefaultValue = "",
   titlePlaceHolder,
   closeModalHref,
   cta
}: TTextEditorProps) => {
   // router
   const router = useRouter();

   //state
   const [postbody, setpostBody] = useState(body);
   // close prop from the router
   const [closeHref, setcloseHref] = useState<string>("#")
   // pas the body down to the preview component and to the parent component for posting
   const handleUpdateBody = (value: string) => {
      setpostBody(value);
      cta.handleBody(value);
   };

   useEffect(()=>{
      if(router.isReady){
         const closeExists = router.query["close"] !== undefined;
         if (closeExists || closeModalHref){
            const closeLink = router.query["close"];
            if(typeof closeLink === 'string'){
               setcloseHref(closeLink.replaceAll("_", "/"))
            }
         }
         
      }
   }, [router.isReady])

   return (
      <div className={styles.mainWrapper}>
   
            <div className={styles.close}>
               {closeHref && <CloseContent href={`/${closeHref}`} />}
               {cta.handleCloseModal && (
                  <CloseContent cta={{ handleClick: cta.handleCloseModal }} />
               )}
            </div>
         <div className={styles.textArea}>
            <TextEditorTextArea
               withTitle={withTitle}
               titleMaxL={titleMaxL}
               titleDefaultValue={titleDefaultValue}
               titlePlaceHolder={titlePlaceHolder}
               defaultValue={postbody}
               placeHolder='Commentary...'
               maxLength={2500}
               cta={{ handleBodyValue: handleUpdateBody, handleTitleValue: cta.handleTitleValue }}
            />
         </div>

         <div className={styles.tagsWraper}>
            <VerseRefTagWrapper
               showRemoveoption={true}
               refs={postReferences}
               cta={{ handleUpdateTagArray: cta.handleReferencedVerses }}
            />
         </div>

         <div className={styles.bottomGridHolder}></div>

         <div className={styles.editorActions}>
            <TextEditorActions
               title={titleDefaultValue}
               body={postbody}
               postImage={postImage}
               userAuthority={userAuthority}
               userId={userId}
               username={username}
               avatar={avatar}
               postPostedOnDate={postPostedOnDate}
               postCreatedDate={postCreatedDate}
               postCategory={postCategory}
               postReferences={postReferences}
               postPrivacy={postPrivacy}
               cta={{
                  handleCategorySelection: cta.handleCategorySelection,
                  handlePrivacySelection: cta.handlePrivacySelection,
                  handleRefVerseSelection: cta.handleRefVerseSelection,
                  handlePost: cta.handlePost
               }}
            />
         </div>
      </div>
   );
};