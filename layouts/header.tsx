import { useState, useEffect } from "react";
import Link from "next/link";

// components
import GeneralDropdown from "../fragments/buttons/general-dropdown";
import QuoteEditor from "../fragments/post-editor/quote-editor";
import CommentEditor from "../fragments/post-editor/comment-editor";
import PopupWrapper from "./popup-wrapper";
import ThoughtTextEditor from "../fragments/post-editor/popup-new-thought";
import SermonNotesPost from "../fragments/post-editor/sermon-notes-post";

// styles
import generalDropDownStyles from "../styles/buttons/GeneralDropDown.module.css";

//helpers
import { TdropdownObjectSingleOption } from "../fragments/buttons/general-dropdown";
import getCookie from "../helpers/get-cookie";

type headerProps = {
   currPage: string;
};

export default function Header({ currPage }: headerProps) {
   // check if the user is authenticated in order to upload to dropbox
   const [isUserAuth, setIsUserAuth] = useState<boolean>(false);
   useEffect(() => {
      const authCookie = getCookie("authorization");
      authCookie ? setIsUserAuth(true) : setIsUserAuth(false);
   }, []);

   // =================   FUNCTION 1: open the new post dropdown   ================= //
   const [openDropDownState, setOpenDropDownState] = useState<boolean>(false);
   const handleShowDropDown = () => {
      setOpenDropDownState(true);
   };

   // =================   FUNCTION 2: open the correct editor depending on selected choice   ================= //
   const [openEditorState, setOpenEditorState] = useState<boolean | JSX.Element>(false);
   const handleOpenEditor = (e: TdropdownObjectSingleOption) => {
      document.body.style.overflow = "hidden";
      e.funcParams === "quote"
         ? setOpenEditorState(
              <QuoteEditor
                 handleCloseStories={() => {
                    document.body.style.overflow = "visible";
                    setOpenEditorState(false);
                 }}
              />
           )
         : e.funcParams === "com"
         ? setOpenEditorState(
              <PopupWrapper
                 content={<CommentEditor versionId={"de4e12af7f28f599-02"} />}
                 closeModal={() => {
                    document.body.style.overflow = "visible";
                    setOpenEditorState(false);
                 }}
              />
           )
         : e.funcParams === "thought"
         ? setOpenEditorState(
              <PopupWrapper
                 content={<ThoughtTextEditor />}
                 closeModal={() => {
                    document.body.style.overflow = "visible";
                    setOpenEditorState(false);
                 }}
              />
           )
         : e.funcParams === "sermon"
         ? setOpenEditorState(
              <PopupWrapper
                 content={<SermonNotesPost />}
                 closeModal={() => {
                    document.body.style.overflow = "visible";
                    setOpenEditorState(false);
                 }}
              />
           )
         : null;
      setOpenDropDownState(false);
   };

   return (
      <>
         {openDropDownState && (
            <GeneralDropdown
               cta={handleOpenEditor}
               dropdownOptionsObject={[
                  { textContent: "Commentary", funcParams: "com", id: 1 },
                  { textContent: "Quote", funcParams: "quote", id: 2 },
                  { textContent: "Thought", funcParams: "thought", id: 3 },
                  { textContent: "Sermon Notes", funcParams: "sermon", id: 4 }
               ]}
               optionNewClass={generalDropDownStyles.header_singleOption}
               mainNewClass={generalDropDownStyles.header_mainWrapper}
            />
         )}
         {openEditorState}
         <div className='header'>
            <div>
               <Link href={"/"}>
                  <a className='header-logo'></a>
               </Link>
            </div>
            <h2 className='header-curr-page'>{currPage}</h2>
            {!openDropDownState && isUserAuth && (
               <span className={"new-post-trigger"} onClick={handleShowDropDown}></span>
            )}
            {openDropDownState && isUserAuth && (
               <span
                  className={"new-post-trigger"}
                  onClick={() => setOpenDropDownState(false)}></span>
            )}
            <Link href={"/go-pro"}>
               <a className={`go-pro-button`}></a>
            </Link>
         </div>
      </>
   );
}
