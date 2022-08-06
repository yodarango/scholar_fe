import { useState } from "react";

//comps
import { IconButton } from "../fragments/buttons/icon_button";
import { Primary } from "../fragments/buttons/primary";
import { Secondary } from "../fragments/buttons/secondary";
import { CategoryTag } from "../fragments/chunks/category_tag";
import { TextEditorFormating } from "../fragments/text_editor_formating";
import { Parragraph } from "../fragments/Typography/parragraph";
import { PrimaryStack } from "./stacks/primary_stack";

// styles
import styles from "./text_editor_actions.module.css";

// helpers
import Portal from "../hoc/potal";

// data
import { BibleBooksWrapper } from "./scrollers/bible_books_wrapper";

type TTextEditorFormatterActionsProps = {
   cta: {
      handleRefVerseSelection: (id: string) => void;
   };
};

export const TextEditorActions = ({ cta }: TTextEditorFormatterActionsProps) => {
   // state
   const [postIsPrivate, setpostIsPrivate] = useState<boolean>(false);
   const [showChooseScriptureModal, setshowChooseScriptureModal] = useState<boolean>(false);

   // handle the referenced verse selection by clossing modal and calling cta.handleRefVerseSelection
   const handlerefVerseSelection = (id: string) => {
      //cta.handleRefVerseSelection(id);
      setshowChooseScriptureModal(false);
   };

   return (
      <>
         <Portal>
            <div className={styles.scriptureWrapper}>
               {showChooseScriptureModal && (
                  <PrimaryStack
                     title='Select scripture'
                     cta={() => setshowChooseScriptureModal(false)}
                     content={
                        <BibleBooksWrapper
                           versionId='de4e12af7f28f599-02'
                           stopAtVerse={false}
                           stopAtChapter={false}
                           cta={{ handleChoice: (id) => handlerefVerseSelection(id) }}
                        />
                     }
                  />
               )}
            </div>
         </Portal>
         <div className={styles.mainWrapper}>
            <div className={styles.textEditorFormatter}>
               <TextEditorFormating />
            </div>

            <div className={styles.preview}>
               <IconButton icon='eye' backgroundColor='1' cta={{ handleClick: () => {} }} />
            </div>

            <div className={styles.reference}>
               <Secondary
                  title='Reference'
                  icon='📖'
                  cta={{ handleClick: () => setshowChooseScriptureModal(true) }}
                  type='1'
               />
            </div>

            <div className={styles.privacy}>
               {postIsPrivate && (
                  <>
                     <div className={styles.sideText}>
                        <Parragraph text='Private' quiet={true} size='xsmall' bold={true} />
                     </div>
                     <IconButton
                        icon='lockClosed'
                        backgroundColor='2'
                        cta={{ handleClick: () => setpostIsPrivate(false) }}
                     />
                  </>
               )}
               {!postIsPrivate && (
                  <>
                     <div className={styles.sideText}>
                        <Parragraph text='Public' quiet={true} size='xsmall' bold={true} />
                     </div>
                     <IconButton
                        icon='lockOpen'
                        backgroundColor='1'
                        cta={{ handleClick: () => setpostIsPrivate(true) }}
                     />
                  </>
               )}
            </div>

            <div className={styles.category}>
               <div className={styles.sideText}>
                  <Parragraph text={"Category"} quiet={true} size='xsmall' bold={true} />
               </div>
               <CategoryTag id='CYN' cta={{ handleShowCategoryMeta: () => {} }} />
            </div>

            <div className={styles.post}>
               <Primary type='1' title='POST' cta={{ handleClick: () => {} }} />
            </div>
         </div>
      </>
   );
};
