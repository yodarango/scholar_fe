import { useState } from "react";

// comps
import { IconGhost } from "./icon_ghost";
import { Parragraph } from "../Typography/parragraph";
import { SelectBibleLanguage, TavailableLanuages } from "../../layouts/menus/select_bible_laguage";

// styles
import styles from "./bible_language.module.css";

type TBibleVersionLanguageProps = {
   cta: (item: TavailableLanuages) => void;
};

export const BibleVersionLanguage = ({ cta }: TBibleVersionLanguageProps) => {
   // -------------------- states -----------
   const [showMenu, setshowMenu] = useState(false);
   const [currentlangIcon, setcurrentLangIcon] = useState("🇺🇸");

   // chnage the icon on the button and send the informatin to the parent to handle selection
   const handleLangSeclection = (item: TavailableLanuages) => {
      setcurrentLangIcon(item.icon);
      cta(item);
   };

   return (
      <div className={styles.mainWrapper}>
         {showMenu && (
            <SelectBibleLanguage
               cta={{
                  handleCloseModal: () => setshowMenu(false),
                  handleSelection: handleLangSeclection
               }}
            />
         )}
         <IconGhost
            cta={showMenu ? () => setshowMenu(false) : () => setshowMenu(true)}
            icon={
               <Parragraph align='center' size='large' text={currentlangIcon} lineHieght='.9em' />
            }
         />
      </div>
   );
};
