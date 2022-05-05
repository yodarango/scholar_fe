// **************************  PURPOSE ******************************* //
// *** Thi component calls for a list of all bible verses ************ //
// *** based on the result obtained from the "get-new-chapter ******** //
// *** component call and will display the selected verse not in a *** //
// *** new page but in a function componenet ************************* //

// core
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

//components
import CardsLazyLoading from "../../layouts/cards-lazy-loading";

// styles
import selectNewScriptureStyles from "../../styles/layouts/SelectNewScripture.module.css";
import cardsLazyLoadingStyles from "../../styles/layouts/CardsLazyLoading.module.css";

// helpers
import { chosenKey } from "../../helpers/APIs/select-random-api-key";

// others

type getNewVerseProps = {
   closeModal: React.MouseEventHandler;
   goBackModal: React.MouseEventHandler;
   renderSelectedVerse: any;
   chapterId?: string;
   versionId: string;
};

export type TnewVerse = {
   id: string;
   orgId: string;
   bibleId: string;
   chapterId: string;
   reference: string;
};
const GetNewVersePostCommentary = ({
   chapterId,
   closeModal,
   goBackModal,
   renderSelectedVerse,
   versionId
}: getNewVerseProps) => {
   // loading state
   const [loadingState, setLoadingState] = useState<string>("loading");
   const [getNewVerse, setGetNewVerse] = useState<TnewVerse[]>([]);

   const getNewChapterFunct = async () => {
      try {
         const resp = await fetch(
            `https://api.scripture.api.bible/v1/bibles/${versionId}/chapters/${chapterId}/verses`,
            {
               method: "GET",
               headers: {
                  "api-key": `${chosenKey}`
               }
            }
         );
         const json = await resp.json();
         setGetNewVerse(json.data);
         setLoadingState("done");
      } catch (error) {
         setLoadingState("error");
         setGetNewVerse([]);
         console.log(error);
      }
   };

   useEffect(() => {
      getNewChapterFunct();
   }, []);

   return (
      <>
         <div className={`full-cover-bkg ${selectNewScriptureStyles.majorWrapperVerse}`}>
            <p className={`std-text-block--small-title ${selectNewScriptureStyles.modalTitle}`}>
               VERSE 📃
            </p>
            <div className={selectNewScriptureStyles.wrapper}>
               <div className='closeModal' onClick={closeModal}>
                  X
               </div>
               <div className='goBack' onClick={goBackModal}>
                  {"<"}
               </div>
               {getNewVerse.map((el: TnewVerse) => (
                  <div
                     key={el.id}
                     data-verse={`${el.id}`}
                     data-name={`${el.reference}`}
                     className={selectNewScriptureStyles.bibleBookRow}
                     onClick={() => renderSelectedVerse(el)}>
                     <p className={`std-text-block ${selectNewScriptureStyles.stdTextNoMargin}`}>
                        {el.reference}
                     </p>
                  </div>
               ))}
               {loadingState == "loading" && (
                  <CardsLazyLoading
                     amount={30}
                     compClass={cardsLazyLoadingStyles.selectScriptureVerseBook}
                  />
               )}

               {loadingState == "error" && (
                  <div className={cardsLazyLoadingStyles.errorImage}>
                     <Image layout='fill' alt='resource not found' src={"/Parks10.png"} />
                  </div>
               )}
            </div>
         </div>
      </>
   );
};

export default GetNewVersePostCommentary;
