/***********************************************************************************************************  
-   A new Bible verse based on router.query or readyData
    - readyData is checked on the useEffect. If it is present the call will not happen. Otherwise a call to
      API is made
-   If the query is null than only the button will be rendered
************************************************************************************************************/

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// comps
import { Header } from "./Typography/header";
import { Parragraph } from "./Typography/parragraph";
import { Primary } from "./buttons/primary";

// styles
import styles from "./text_editor_verse_selection.module.css";

// helpers
import { fetchBibleVerse } from "../../helpers/APIs/fetch_bible_verse";

// types
import { TBibleVerse } from "../../types/bible_api";
import { RoundLoader } from "./chunks/round_loader";
import { ResourceNotFound } from "../common/feedback/resource_not_found";
import { PrimaryStack } from "../layouts/stacks/templates/primary_stack";
import { BibleBooksWrapper } from "../layouts/scrollers/bible_books_wrapper";

// helpers
import Portal from "../hoc/potal";

type TTextEditorVerseSelectionProps = {
   readyData?: any;
   verseID?: string;
   renderButton?: boolean;
   cta: {
      handleVerseData: (verse: TBibleVerse) => void;
   };
};

export const TextEditorVerseSelection = ({
   cta,
   readyData,
   renderButton,
   verseID
}: TTextEditorVerseSelectionProps) => {
   const [buttonTitle, setbuttonTitle] = useState<string>("");
   const [verseData, setverseData] = useState<null | TBibleVerse>(null);
   const [loading, setLoading] = useState<string>("loading");
   const [showChooseScriptureModal, setshowChooseScriptureModal] = useState<boolean>(false);

   // router
   const router = useRouter();

   // call the bible verse
   const fetchVerse = async (verseId: string | undefined | string[]) => {
      const verse = await fetchBibleVerse(verseId);

      if (verse !== null) {
         setLoading("done");
         cta.handleVerseData(verse);
         setbuttonTitle("Change scripture");
      } else {
         setLoading("error");
         setbuttonTitle("Select scripture");
      }

      setverseData(verse);
   };

   // fetch data on render
   // set the data in the following hierarchy
   // 1. router, 2. readyData, 3. verseID
   const setIdToFetch = () => {
      const verseId: string | undefined | string[] = router.query["VERSE_ID"];
      // check if the parent is passing the data so the API call does not happen
      if (verseId) {
         setLoading("loading");

         if (router.isReady && router.query["VERSE_ID"]) {
            fetchVerse(verseId);
         } else {
            setverseData(null);
            setLoading("done");
            setbuttonTitle("Select scripture");
         }
      } else if (readyData) {
         setbuttonTitle("Change scripture");
         setLoading("done");
         setverseData(readyData);
      } else if (verseID) {
         fetchVerse(verseID);
      } else {
         setbuttonTitle("Select scripture");
         setLoading("done");
      }
   };

   useEffect(() => {
      if (router.isReady) setIdToFetch();
   }, [router.isReady, router.query]);

   // handle verse selection from the BibleBook Wrapper
   const handlerefVerseSelection = (id: string) => {
      setshowChooseScriptureModal(false);

      const queryID = router.query.id ? router.query.id : "";
      router.push(`${router.pathname.replace("[signature]", "")}${queryID}?VERSE_ID=${id}`);
   };

   return (
      <>
         <Portal>
            {showChooseScriptureModal && renderButton && (
               <div className={styles.bibleBooksStack}>
                  <PrimaryStack
                     title='Select scripture'
                     cta={{ handleClose: () => setshowChooseScriptureModal(false) }}>
                     <BibleBooksWrapper
                        versionId='de4e12af7f28f599-02'
                        stopAtVerse={false}
                        stopAtChapter={false}
                        stopAtChapterId={false}
                        cta={{ handleChoice: (id) => handlerefVerseSelection(id) }}
                     />
                  </PrimaryStack>
               </div>
            )}
         </Portal>
         <div className={styles.mainWrapper}>
            {/* content */}
            {verseData && loading === "done" && (
               <>
                  <div className={styles.title}>
                     <Header type={2} text={verseData.reference} size='main' quiet={true} />
                  </div>

                  <div className={styles.verse}>
                     <Parragraph size='main' text={verseData.content} />
                  </div>
               </>
            )}

            {/* loader */}
            {loading === "loading" && (
               <div className={styles.loader}>
                  <RoundLoader />
               </div>
            )}
            {/* error */}
            {loading === "error" && (
               <div className={styles.error}>
                  <ResourceNotFound />
               </div>
            )}
            {renderButton && (
               <div>
                  <Primary
                     type='2'
                     title={buttonTitle}
                     cta={{ handleClick: () => setshowChooseScriptureModal(true) }}
                  />
               </div>
            )}
         </div>
      </>
   );
};
