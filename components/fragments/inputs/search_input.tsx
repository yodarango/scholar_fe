/****************************************************************************************
-  returns a string with the current input value wither in the handleOnchange or in the 
   handleSearchGo
*****************************************************************************************/

import { useRef } from "react";

// components
import { IconButton } from "../buttons/icon_button";
import { Icon } from "../chunks/icons";

// styles
import styles from "./search_input.module.css";

type TSearchInputProps = {
   placeholder: string;
   maxL: number;
   cta: {
      handleOnChange?: (value: string) => void;
      handleSearchGo?: (value: string) => void;
   };
};
export const SearchInput = ({ placeholder, maxL, cta }: TSearchInputProps) => {
   // references
   const input = useRef<HTMLInputElement>(null);
   let lastinput: number;

   const handleSearch = (e: any) => {
      // set the time at function call
      lastinput = Date.now();

      setTimeout(() => {
         // time at timeout
         let currTime = Date.now();

         // if more than 1000 milliseconda have ellapsed since last time call the callback
         if (cta.handleOnChange && currTime - lastinput > 1000) {
            cta.handleOnChange(e.target.value);
         }
      }, 1000);
   };

   // handle the search on button click
   const handleSearchGo = () => {
      if (input.current?.value && cta.handleSearchGo) {
         cta.handleSearchGo(input.current.value);
      }
   };
   return (
      <>
         {cta?.handleOnChange && (
            <div className={styles.mainWrapper}>
               <input
                  type='type'
                  maxLength={maxL}
                  role='hidden'
                  className={styles.input}
                  placeholder={placeholder}
                  onChange={handleSearch}
               />

               <div className={styles.icon}>
                  <Icon name='search' size='2rem' color='#5C5470' />
               </div>
            </div>
         )}
         {cta.handleSearchGo && (
            <div className={styles.mainWrapperWBtn}>
               <input
                  type='type'
                  maxLength={maxL}
                  role='hidden'
                  className={styles.inputWBtn}
                  placeholder={placeholder}
                  ref={input}
               />

               <div className={styles.searchButton} onClick={handleSearchGo}>
                  <IconButton backgroundColor='1' icon='search' />
               </div>
            </div>
         )}
      </>
   );
};