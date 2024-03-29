// components
import { useState } from "react";
import { BibleLanguage } from "../fragments/buttons/bible_language";
import { BibleVersionScripture } from "../fragments/buttons/bible_version_scripture";
import { ReadBookmark } from "../fragments/chunks/read_bookmark";
import { ReadSettings } from "../fragments/chunks/read_settings";
import { SearchInput } from "../fragments/inputs/search_input";

// styles
import styles from "./read_bible_header.module.css";

type TReadBibleHeaderProps = {
   theme?: string;
   whiteBorder?: boolean;
   versionName: string;
   versionId: string;
   scriptureRef: string;
   chapterId: string | string[];
   langIcon: string;
   searchRightIcon?: string | number | JSX.Element | React.ReactNode;
   cta: {
      handleFontSelection: (value: string) => void;
      handleThemeSelection: (value: string) => void;
      handleSearch: (value: string) => void;
      handleSearchClose: () => void;
   };
};
export const ReadBibleHeader = ({
   cta,
   chapterId,
   langIcon,
   versionId,
   versionName,
   scriptureRef,
   whiteBorder,
   searchRightIcon,
   theme
}: TReadBibleHeaderProps) => {
   const [isSearchOpen, setIsSearchOpen] = useState(false);
   let themeClass = "";

   switch (theme) {
      case "1":
         themeClass = styles.firstTheme;
         break;
      case "2":
         themeClass = styles.secondTheme;
         break;
      case "3":
         themeClass = styles.thirdTheme;
         break;
      case "4":
         themeClass = styles.fourthTheme;
         break;
   }

   return (
      <div className={styles.mainWrpper}>
         {!isSearchOpen && (
            <>
               <div className={styles.language}>
                  <BibleLanguage
                     className={styles.firstTheme} //setting first time for now because the header is glassed
                     whiteBorder={whiteBorder}
                     langIcon={langIcon}
                  />
               </div>
               <div className={styles.versionScripture}>
                  <BibleVersionScripture
                     className={styles.firstTheme} //setting first time for now because the header is glassed
                     whiteBorder={whiteBorder}
                     versionId={versionId}
                     versionName={versionName}
                     scriptureRef={scriptureRef}
                  />
               </div>
            </>
         )}
         <div className={`${styles.search} ${isSearchOpen ? styles.searchActive : ""}`}>
            <SearchInput
               bounceTime={100}
               iconButton={{ shadowColor: "none" }}
               placeholder='search in chapter'
               inputIconRight={searchRightIcon}
               maxL={50}
               cta={{
                  handleOnChange: cta.handleSearch,
                  handleInputStretch: (val) => {
                     cta.handleSearchClose();
                     setIsSearchOpen(val);
                  }
               }}
            />
         </div>

         {!isSearchOpen && (
            <>
               <div className={styles.bookmarks}>
                  <ReadBookmark chapterId={chapterId} />
               </div>
               <div className={styles.settings}>
                  <ReadSettings
                     cta={{
                        handleFontSelection: cta.handleFontSelection,
                        handleThemeSelection: cta.handleThemeSelection
                     }}
                  />
               </div>
            </>
         )}
      </div>
   );
};
