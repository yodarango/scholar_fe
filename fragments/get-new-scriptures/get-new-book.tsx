// **************************  PURPOSE ******************************* //
// *** Thi component calls for a list of all bible books ************* //

// core
import React, { MouseEventHandler, useEffect, useState } from "react";
import CardsLazyLoading from "../../layouts/cards-lazy-loading";
import Image from "next/image";

//components
import ResourceNotFoundError from "../chunks/error_resource_not_found";

// styles
import selectNewScriptureStyles from "../../styles/layouts/selectNewScriptureError.module.css";
import cardsLazyLoadingStyles from "../../styles/layouts/CardsLazyLoading.module.css";

//helpers
import { chosenKey } from "../../helpers/APIs/select-random-api-key";

// others

type getNewBookProps = {
   closeModal: MouseEventHandler;
   openGetNewChapterFunc: any;
   versionId: string;
};

type bibleBooks = {
   id: string;
   bibleId: string;
   abbreviation: string;
   name: string;
   nameLong: string;
};
const GetNewBook = ({ closeModal, openGetNewChapterFunc, versionId }: getNewBookProps) => {
   const [loadingState, setLoadingState] = useState<string>("loading");
   const [getnewChapter, setGetnewChapter] = useState<bibleBooks[] | null>(null);

   const getNewBook = async () => {
      try {
         const requ = await fetch(`https://api.scripture.api.bible/v1/bibles/${versionId}/books`, {
            method: "GET",
            headers: {
               "api-key": `${chosenKey}`
            }
         });

         const json = await requ.json();
         json.data
            ? (setGetnewChapter(json.data), setLoadingState("done"))
            : setLoadingState("error");
      } catch (error) {
         setGetnewChapter(null);
         setLoadingState("error");
      }
   };

   useEffect(() => {
      getNewBook();
   }, []);

   return (
      <div className={`full-cover-bkg`}>
         <p className={`std-text-block--small-title ${selectNewScriptureStyles.modalTitle}`}>
            BOOK 📖
         </p>
         <div className={selectNewScriptureStyles.wrapper}>
            <div className='closeModal' onClick={closeModal}>
               X
            </div>

            {getnewChapter &&
               loadingState == "done" &&
               getnewChapter.map((el) => (
                  <div
                     key={el.id}
                     data-book={`${el.id}`}
                     className={selectNewScriptureStyles.bibleBookRow}
                     onClick={() => openGetNewChapterFunc(el.id)}>
                     <p className={`std-text-block ${selectNewScriptureStyles.stdTextNoMargin}`}>
                        {el.name}
                     </p>
                  </div>
               ))}

            {loadingState == "loading" && (
               <CardsLazyLoading
                  amount={66}
                  compClass={cardsLazyLoadingStyles.selectScriptureVerseBook}
               />
            )}

            {loadingState == "error" && <ResourceNotFoundError />}
         </div>
      </div>
   );
};

export default GetNewBook;
