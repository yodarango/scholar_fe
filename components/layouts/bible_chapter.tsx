/**************************************************************************************** 
-  This component renders a reading full Bible chapter of the Bible APi. 
-  The rendering is control by a parent's state which is dependant on the useRouter hook, 
   so every time a new Scripture is selected, the router is updated and this component 
   re-rendered via the chapterId prop.
-  this component passes down data to all his children as the prop {data} so that its
   children do not have to refetch
****************************************************************************************/
// core
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// styles
import styles from "./bible_chapter.module.css";

// components
import { fetchBibleChapter } from "../../helpers/APIs/fetch_bible_chapter";
import { RoundLoader } from "../fragments/chunks/round_loader";
import { ResourceNotFound } from "../common/feedback/resource_not_found";
import { Header } from "../fragments/Typography/header";
import { SelectReadingActions } from "./menus/select_reading_actions";
import Portal from "../hoc/potal";

// helpers
import {
   handleGetHighilightedVerses,
   ThandlePostHighlight,
   handlePostHighlight,
   handleRemoveHighlight
} from "../../helpers/functions/reading/highlighted_verses";

// types
import { THighlightVerses } from "../../types/read";
import { CONTENT_LAST_ID } from "../../constants/defaults";
import { FONT_COLOR, GRADIENT_1__LIGHT, PRIMARY_COLOR } from "../../constants/tokens";
import { errorMessages } from "../../data/error_messages";
import {
   handleGetChapterRefs,
   useGetChapterData // not used for now
} from "../../helpers/functions/reading/use_chapter_data";
import { ViewCommentary } from "../templates/posts/view_commentary";
import PortalTernary from "../hoc/portal_ternary";
import { Notification } from "../fragments/popups/notification";
import { YouNeedToLoginModal } from "../common/modals/you_need_to_login_modal";
import { loggedInUser } from "../../helpers/auth/get-loggedin-user";
import { getColorContrast } from "../../helpers/getColorContrast";
import { Parragraph } from "../fragments/Typography/parragraph";
import { Pagination } from "../fragments/buttons/pagination";

type chapterProps = {
   chapterId: string | string[]; // string[] is only to satisfy next router type
   searchText?: string; //finds a string within a verse
   fontSize?: string;
   scrollingDir?: string;
   versionId: string;
   theme?: string;
   userId?: string;
   cta: {
      handleUpdateTextSearchCount: (count: number) => void;
   };
};

export const BibleChapter = ({
   chapterId,
   versionId,
   fontSize = "main",
   searchText,
   scrollingDir,
   theme = "1",
   userId,
   cta
}: chapterProps) => {
   const router = useRouter();

   const { signature } = router.query;

   // states
   const [showReadingMenu, setshowReadingMenu] =
      useState<undefined | { verseNumber: string; verseContent: string }>(undefined);

   const [highlightedVerses, sethighlightedVerses] = useState<THighlightVerses[]>([]);
   const [data, setdata] = useState<any>(null);
   const [loading, setloading] = useState("loading");
   const [fntSize, setfntSize] = useState<string | undefined>(fontSize);
   const [thme, setthme] = useState<string | undefined>(fontSize);
   const [currentUser, setCurrentUser] = useState<any>(null);

   const [versesArray, setversesArray] = useState<{ text: string; meta: any }[]>([
      { text: "", meta: {} }
   ]);
   const [chapterTitle, setchapterTitle] = useState<string>("");

   const [chapterRefVars, setchapterRefVars] = useState<any>(null);
   const [commentaries, setcommentaries] = useState<any>([]);
   const [commentaryModal, setcommentaryModal] = useState<string>("none");
   const [notification, setnotification] =
      useState<null | {
         title: string;
         body: string;
         type: string;
      }>(null);
   const [openModal, setOpenModal] = useState<boolean>(false);

   // fetch the Bible API Data
   const fetchData = async (chapterId: string | string[], versionId: string) => {
      try {
         const chapter = await fetchBibleChapter(chapterId, versionId);

         if (chapter === undefined) {
            setloading("error");
            setdata(null);
            sethighlightedVerses([]);
         } else {
            // call "done" in the highlighted verses call since it is the last step to run
            setdata(chapter);
         }
      } catch (error) {
         console.error(error);
         setloading("error");
         setdata(null);
         sethighlightedVerses([]);
      }
   };

   // fetch highlighted verses
   const fetchChapterData = async (variables: any) => {
      try {
         const highlights: any = await handleGetHighilightedVerses(variables);
         const refs: any = await handleGetChapterRefs(variables);

         if (highlights.data?.highlighted_verses) {
            sethighlightedVerses(highlights.data.highlighted_verses);
            setloading("done");
         } else {
            setloading("done");
            sethighlightedVerses([]);
            console.warn(errorMessages.read.noHighlightVerses.description);
         }

         // chapter comments
         if (refs.data) {
            setcommentaries(refs.data);
            setloading("done");
         } else {
            setloading("done");
            setcommentaries([]);
            console.warn(errorMessages.read.noChapterRefs.description);
         }
      } catch (error) {
         setloading("done");
         sethighlightedVerses([]);
         console.error(error);
      }
   };

   // call chapter data API on chapter Id change
   useEffect(() => {
      fetchData(chapterId, versionId);
   }, [chapterId]);

   // get the highlighted verses once the variables are not null
   useEffect(() => {
      if (chapterRefVars) {
         fetchChapterData(chapterRefVars);
      } else {
         setloading("done");
      }
   }, [chapterRefVars]);

   // highlight the verse
   const handleHighlightVerse = async ({
      VERSE_ID,
      highlight_type,
      color
   }: ThandlePostHighlight) => {
      // check if the color is transparent with ID of -1 which means the user is removing the highlight
      if (highlight_type === -1) {
         try {
            const data: any = await handleRemoveHighlight(VERSE_ID);

            if (data.status === "done") {
               // if the verse is removed remove the verse from the array
               const findVerse = highlightedVerses.filter(
                  (highlight) => highlight.VERSE_ID !== VERSE_ID
               );

               sethighlightedVerses(findVerse);
            } else if (data.status === "not_auth") {
               setOpenModal(true);
            } else if (data.status === "server_error") {
               setnotification(data.error);
            }
         } catch (error) {
            setnotification(errorMessages.posts.highLightVerse);
            console.error(error);
         }
      } else {
         try {
            const data: any = await handlePostHighlight({
               VERSE_ID,
               highlight_type,
               color
            });

            if (data.status === "done") {
               // exclude the verse being highlighted from the saved verses in case it already exists
               const findVerse: THighlightVerses[] = highlightedVerses.filter(
                  (highlight) => highlight.VERSE_ID !== VERSE_ID
               );
               sethighlightedVerses([
                  ...findVerse,
                  { ID: 2, USER_ID: "1", VERSE_ID, highlight_type, color }
               ]);
            } else if (data.status === "not_auth") {
               setOpenModal(true);
            } else if (data.status === "server_error") {
               setnotification(data.error);
            }
         } catch (error) {
            setnotification(errorMessages.posts.highLightVerse);
            console.error(error);
         }
      }

      // close modal
      setshowReadingMenu(undefined);
   };

   const handleStickerChoice = (sticker: string, ID: string, VERSE_ID: string) => {
      setcommentaries((prev: any) => [...prev, { ID, sticker, VERSE_ID }]);
   };

   // update font
   useEffect(() => {
      const LSExists = localStorage.getItem("reading-preferences");
      if (LSExists) {
         const LSParsed = JSON.parse(LSExists);
         const font = LSParsed.font;
         setfntSize(
            font === "small"
               ? styles.fontSmall
               : font === "main"
               ? styles.fontMain
               : font === "large"
               ? styles.fontLarge
               : styles.fontXlarge
         );
      }
   }, [fontSize]);

   // update theme
   useEffect(() => {
      const LSExists = localStorage.getItem("reading-preferences");
      if (LSExists) {
         const LSParsed = JSON.parse(LSExists);
         const theme = LSParsed.theme;
         setthme(
            theme === "1"
               ? styles.firstTheme
               : theme === "2"
               ? styles.secondTheme
               : theme === "4"
               ? styles.fourthTheme
               : styles.thirdTheme // default one
         );
      }
   }, [theme]);

   // extract the chapter title
   useEffect(() => {
      let verse = data && data.content.split(/\[[0-9]*\]/g);
      const chapterTitle = data && data.content.split("\n")[0];
      verse =
         verse &&
         verse.map((verse: string, i: number) => ({
            text: verse.replaceAll("¶", ""),
            meta: {
               // random ID so we can find this verse when fileting
               uid: i * Math.floor(Math.random() * 9000) + 100
            }
         }));

      setchapterTitle(chapterTitle);
      setversesArray(verse);
   }, [data]);

   // filter the verses based on the search text
   useEffect(() => {
      if (!searchText || searchText === "") {
         setversesArray(
            versesArray.map((verse) => ({
               ...verse,
               meta: { ...verse.meta, isSearchResult: false }
            }))
         );

         cta.handleUpdateTextSearchCount(0);
      } else if (searchText) {
         // remove the previous search
         const removePreviousSearch = versesArray.map((verse) => ({
            ...verse,
            meta: { ...verse.meta, isSearchResult: false }
         }));

         const search = searchText.toLowerCase();
         const findVerse = versesArray.filter((verse) => verse.text.toLowerCase().includes(search));

         let updatedVerse = versesArray;
         let findVerseIndex: number[] = [];

         findVerse.map((verse1) => {
            let index = versesArray.findIndex((verse2) => verse1.meta.uid === verse2.meta.uid);
            if (index > -1) findVerseIndex.push(index);

            findVerseIndex.map((index) => {
               const editVerseMeta = removePreviousSearch[index];
               editVerseMeta.meta.isSearchResult = true;
            });

            updatedVerse = removePreviousSearch;
         });

         cta.handleUpdateTextSearchCount(findVerseIndex.length);
         setversesArray(updatedVerse);

         if (findVerse.length > 0) {
            let verse = document.getElementById(`${findVerse[0].meta.uid}`);

            verse?.scrollIntoView({
               behavior: "smooth"
            });
         }
      }
   }, [searchText]);

   useEffect(() => {
      const user = loggedInUser();
      setCurrentUser(user);

      const vars = {
         VERSE_ID: typeof chapterId === "string" ? chapterId : "",
         USER_ID: userId || 0,
         last_id: CONTENT_LAST_ID
      };

      if (!userId && signature !== "@me" && signature !== user?.ID) {
         setchapterRefVars({ ...vars, USER_ID: signature as string });
      } else if (((!userId && signature === "@me") || signature === user?.ID) && user) {
         setchapterRefVars({ ...vars, USER_ID: null });
      } else {
         setchapterRefVars(vars);
      }
   }, [chapterId, signature]);

   return (
      <>
         {loading === "done" && data && (
            <div className={styles.mainWrapper}>
               {/* Portals */}
               <Portal>
                  {notification && (
                     <Notification
                        title={notification.title}
                        body={notification.body}
                        type={notification.type}
                        cta={{ handleClose: () => setnotification(null) }}
                     />
                  )}
                  {showReadingMenu && (
                     <SelectReadingActions
                        data={{ ...data, ...showReadingMenu }}
                        cta={{
                           handleCloseModal: () => setshowReadingMenu(undefined),
                           handleHighlightVerse,
                           handleStickerChoice
                        }}
                     />
                  )}
               </Portal>
               <YouNeedToLoginModal open={openModal} onClose={() => setOpenModal(false)} />
               <div className={styles.chapter}>
                  <Header
                     text={`Chapter ${chapterTitle} `}
                     size='main'
                     color={GRADIENT_1__LIGHT}
                     type={3}
                  />
               </div>

               {/* loop through the data array to render the Chapter  */}
               <div className={styles.versesWrapper}>
                  {versesArray.map((verse, index: number) => {
                     // check if the verse is Highlighted
                     const isHighlighted = highlightedVerses.find(
                        (verse) => verse.VERSE_ID === `${chapterId}.${index}`
                     );

                     let highlight = { color: FONT_COLOR, bkgColor: "transparent" };

                     if (isHighlighted) {
                        if (isHighlighted.color) highlight.bkgColor = isHighlighted.color;

                        highlight.color =
                           getColorContrast(isHighlighted?.color || "") === 0
                              ? PRIMARY_COLOR
                              : FONT_COLOR;
                     }

                     // get the commentary references if any
                     const commentary: any = commentaries.find(
                        (c: any) => c.VERSE_ID === `${chapterId}.${index}`
                     );

                     return (
                        index !== 0 &&
                        // exclude the chapter and the references
                        index + 1 !== versesArray.length && (
                           <div
                              id={verse.meta.uid}
                              className={styles.verseLine}
                              key={index}
                              style={{
                                 backgroundColor: verse.meta.isSearchResult
                                    ? "rgba(255, 255, 255, 0.2)"
                                    : highlight.bkgColor
                              }}>
                              <span
                                 onClick={() =>
                                    !showReadingMenu
                                       ? setshowReadingMenu({
                                            verseNumber: `${index}`,
                                            verseContent: verse.text
                                         })
                                       : setshowReadingMenu(undefined)
                                 }
                                 className={`${styles.verseNumber} ${
                                    index > 99 && styles.bigVerseNumber
                                 }`}>
                                 {index}
                              </span>
                              <p
                                 className={`${styles.verse} ${fntSize} ${thme}`}
                                 style={{ color: highlight?.color }}>
                                 <span className={styles.tab}></span>
                                 {verse.text}
                                 {commentary && (
                                    <span
                                       // style={{ backgroundImage: `url(${commentary.sticker})` }}
                                       className={styles.commentarySticker}
                                       onClick={() => setcommentaryModal(commentary.ID)}>
                                       {commentary.sticker}
                                    </span>
                                 )}
                              </p>
                           </div>
                        )
                     );
                  })}
               </div>
            </div>
         )}

         {scrollingDir === "down" && (
            <Pagination
               type='3'
               top='80vh'
               forContent='read'
               onGoBack={() =>
                  router.push({ query: { ...router.query, ["chapter-id"]: data?.previous?.id } })
               }
               onGoForth={() =>
                  router.push({ query: { ...router.query, ["chapter-id"]: data?.next?.id } })
               }
            />
         )}
         {commentaryModal !== "none" && (
            <PortalTernary>
               <ViewCommentary
                  userId={signature as string}
                  commentaryID={commentaryModal}
                  cta={{
                     handleClose: () => setcommentaryModal("none"),
                     handleEdit: () => router.push(`/posts/commentary/edit/${commentaryModal}`)
                  }}
                  withEdit={!!currentUser}
               />
            </PortalTernary>
         )}
         {loading === "loading" && (
            <div className={styles.loader}>
               <RoundLoader />
            </div>
         )}
         {loading === "done" && data && data.copyright && (
            <Parragraph text={data.copyright} size='xsmall' className='scriptures-copyright' />
         )}
         {loading == "error" && (
            <div className={styles.error}>
               <ResourceNotFound />
            </div>
         )}
      </>
   );
};
