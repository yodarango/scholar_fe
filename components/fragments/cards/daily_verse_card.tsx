/********************************************************************************************* 
   //! not able to load in stories due to the useRouter hook by next
-  This component loads a specific verse by calling the verse-id in the router. If no verse-id 
   value is found in the router, however, a default verse will be returned by the helper
   function making the call.
-  The Component listens to the router change, therefore a new verse will load each  time the
   router query changes
*********************************************************************************************/

// core
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

// components
import { Icon } from "../chunks/icons";
import { Header } from "../Typography/header";
import { Parragraph } from "../Typography/parragraph";
import { ResourceNotFoundError } from "../chunks/error_resource_not_found";

// styles
import styles from "./daily_verse_card.module.css";

// helpers: types
import { fetchBibleVerseWDefault } from "../../helpers/APIs/fetch_bible_verse_with_default";
import { RoundLoader } from "../chunks/round_loader";

export const DailyVerseCard = () => {
   // -------------------------- hooks --------------------
   const [verseContent, setverseContent] = useState<any>(null);
   const [loading, setloading] = useState<string>("loading");

   // ----------------- make the call to the API on useEffect and router.isReady
   const getVerseDate = async (version?: string) => {
      const verseId = router.query["verse-id"];

      const verseContent = await fetchBibleVerseWDefault(verseId, version);

      if (!verseContent) {
         setverseContent(null);
         setloading("error");
      } else {
         setverseContent(verseContent);
         setloading("done");
      }
   };

   // get the data
   const router = useRouter();
   useEffect(() => {
      const LSExists = localStorage.getItem("reading-preferences");
      if (LSExists) {
         const LSParsed = JSON.parse(LSExists);

         if (router.isReady) {
            getVerseDate(LSParsed.vesionId);
         }
      }
   }, [router.isReady, router.query]);

   return (
      // ------------------------ loading state ------------------------
      <div className={styles.mainWrapper}>
         {loading === "loading" && (
            <div className={`${styles.card} ${styles.loadinCard}`}>
               <div className={styles.title}>
                  <Header text='Loading...' type={3} size='main' align='center' lineHieght='.9' />
               </div>
               <div className={styles.loader}>
                  <RoundLoader />
               </div>
            </div>
         )}

         {/* ------------------------ load content -------------------------- */}

         {verseContent && loading === "done" && (
            <div className={styles.card}>
               {/* --------------------- title ---------------------- */}
               <div className={styles.title}>
                  <Header
                     text={verseContent.reference}
                     type={3}
                     size='main'
                     align='center'
                     lineHieght='.9'
                  />
               </div>

               {/* --------------------- content ---------------------- */}
               <div className={styles.content}>
                  <Parragraph text={verseContent.content} size='main' align='center' />
               </div>

               {/* --------------------- card actions ----------------- */}
               <div className={styles.actions}>
                  <Link href={`/verse-by-verse?verse-id=${verseContent.previous.id}`}>
                     <a>
                        <Icon name='arrowBack' size='2rem' color='#F1EAFF' />
                     </a>
                  </Link>

                  <Link href={`/posts/commentary/new?verse-id=${verseContent.id}`}>
                     <a>
                        <Icon name='comment' size='2rem' color='#F1EAFF' />
                     </a>
                  </Link>

                  <Link href={`/verse-by-verse?verse-id=${verseContent.next.id}`}>
                     <a>
                        <Icon name='arrowForth' size='2rem' color='#F1EAFF' />
                     </a>
                  </Link>
               </div>
            </div>
         )}
         {loading === "error" && (
            <div className={`${styles.card} ${styles.loadinCard}`}>
               <div className={styles.title}>
                  <Header
                     text='There was an error'
                     type={3}
                     size='main'
                     align='center'
                     lineHieght='.9'
                  />
               </div>
               <div className={styles.error}>
                  <ResourceNotFoundError />
               </div>
            </div>
         )}
      </div>
   );
};