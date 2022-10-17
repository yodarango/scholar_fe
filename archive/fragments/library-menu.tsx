// core
import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

//styles
import libraryMenuStyles from "../../styles/buttons/LibraryMenu.module.css";

// helpers
import { valuesCat } from "../../data/category_meta";

//types
import { IvaluesCat } from "../../data/category_meta";

type currentPageNewClass = {
   popular?: string;
   sermons?: string;
   articles?: string;
   podcasts?: string;
   watch?: string;
   blogs?: string;
   books?: string;
   congregations?: string;
};

type libraryMenuProps = {
   includeSearch?: boolean;
   includeCategory?: boolean;
   includeContent?: boolean;
   contentButtonIcon: string;
   currentSlectedContentPage: currentPageNewClass;
   handleInputSearchReq?: any;
};
const libraryMenu = ({
   includeCategory,
   includeContent,
   includeSearch,
   contentButtonIcon,
   currentSlectedContentPage,
   handleInputSearchReq
}: libraryMenuProps) => {
   // ====================   FUNCTION 1: Open the Content Dorpdown   ================//
   const [openContentDropDState, setOpenContentDropDState] = useState<boolean>(false);
   const handleOpenContent = () => {
      setOpenContentDropDState(true);
   };

   const handleCloseContent = () => {
      setOpenContentDropDState(false);
   };

   // ====================   FUNCTION 2: Open and Close the Category DropDown    ===============//
   const [openCatDropdownState, setopenCatDropdownState] = useState<boolean>(false);
   const handleOpenCategoryDropDown = () => {
      setopenCatDropdownState(true);
   };

   const handleCloseCategoryDropDown = () => {
      setopenCatDropdownState(false);
   };

   // ====================   FUNCTION 2: Fetch Data and change the Category Choice button value  ===============//
   const router = useRouter();
   const [currentCategorySelectedState, setCurrentCategorySelectedState] = useState<{
      color: string;
      tag: string;
   }>({ color: "", tag: "#ALL" });

   const handleCategoryChoice = (color: string, tag: string, categoryID: number) => {
      console.log(router);
      setCurrentCategorySelectedState({ color, tag });
      setopenCatDropdownState(false);
      router.replace({ pathname: router.route, query: { category: categoryID } });
   };

   // clear out the router from tags and fetch all resutls again
   const resetCategorySelector = () => {
      setCurrentCategorySelectedState({ color: "", tag: "#ALL" });
      setopenCatDropdownState(false);
      router.replace(router.route);
   };

   // get the value of the inout field to handle the search
   const searchInputValue = useRef<HTMLInputElement>(null);
   return (
      <>
         <div className={`${libraryMenuStyles.mainWrapperDesktop}`}>
            <div className={`${libraryMenuStyles.linksWrapperDesktop}`}>
               <Link href={"/library"}>
                  <a
                     style={{ color: currentSlectedContentPage.popular }}
                     className={`${libraryMenuStyles.contentSingleItemDesktop}`}>
                     🔥 Popular
                  </a>
               </Link>
               <Link href={"/library/sermon-notes"}>
                  <a
                     style={{ color: currentSlectedContentPage.sermons }}
                     className={`${libraryMenuStyles.contentSingleItemDesktop}`}>
                     🗣️ Sermons
                  </a>
               </Link>
               <Link href='/library/articles'>
                  <a
                     style={{ color: currentSlectedContentPage.articles }}
                     className={`${libraryMenuStyles.contentSingleItemDesktop}`}>
                     📃 Articles
                  </a>
               </Link>
               <Link href={"/library/podcast"}>
                  <a
                     style={{ color: currentSlectedContentPage.podcasts }}
                     className={`${libraryMenuStyles.contentSingleItemDesktop}`}>
                     🎧 Podcasts
                  </a>
               </Link>
               <Link href={"/library/watch"}>
                  <a
                     style={{ color: currentSlectedContentPage.watch }}
                     className={`${libraryMenuStyles.contentSingleItemDesktop}`}>
                     📺 Watch
                  </a>
               </Link>
               <Link href={"/library/blogs"}>
                  <a
                     style={{ color: currentSlectedContentPage.blogs }}
                     className={`${libraryMenuStyles.contentSingleItemDesktop}`}>
                     💻 Web
                  </a>
               </Link>
               <Link href={"/library/books"}>
                  <a
                     style={{ color: currentSlectedContentPage.books }}
                     className={`${libraryMenuStyles.contentSingleItemDesktop}`}>
                     📚 Books
                  </a>
               </Link>
               <Link href={"/library/locations"}>
                  <a
                     style={{ color: currentSlectedContentPage.congregations }}
                     className={`${libraryMenuStyles.contentSingleItemDesktop}`}>
                     ⛪ Locations
                  </a>
               </Link>
            </div>
            <div className={`medium-spacer ${libraryMenuStyles.mediumSpacer}`}></div>
            {includeSearch && (
               <div className={`${libraryMenuStyles.searchWapper}`}>
                  <input
                     type='text'
                     maxLength={50}
                     className={`${libraryMenuStyles.search} std-input`}
                     placeholder='Search a title'
                     ref={searchInputValue}
                  />
                  <span
                     className={`${libraryMenuStyles.magnifyingGlass} std-button`}
                     onClick={() => {
                        searchInputValue.current
                           ? handleInputSearchReq(searchInputValue.current.value.trim())
                           : null;
                     }}>
                     🔎
                  </span>
               </div>
            )}
            {includeCategory && (
               <>
                  {!openCatDropdownState && (
                     <div
                        style={{ backgroundColor: currentCategorySelectedState.color }}
                        className={`${libraryMenuStyles.categoryButtonDesktop}`}
                        onClick={handleOpenCategoryDropDown}>
                        {currentCategorySelectedState.tag}
                     </div>
                  )}
                  {openCatDropdownState && (
                     <div
                        style={{ backgroundColor: currentCategorySelectedState.color }}
                        className={`${libraryMenuStyles.categoryButtonDesktop}`}
                        onClick={handleCloseCategoryDropDown}>
                        {currentCategorySelectedState.tag}
                     </div>
                  )}
                  {openCatDropdownState && (
                     <section className={`${libraryMenuStyles.categoryDropDWrapperDesktop}`}>
                        <span
                           onClick={resetCategorySelector}
                           className={`${libraryMenuStyles.contentSingleItem} ${libraryMenuStyles.allOption}`}>
                           #ALL
                        </span>
                        {valuesCat.map((value: IvaluesCat) => (
                           <span
                              key={value.key}
                              className={`${libraryMenuStyles.contentSingleItem}`}
                              style={{ backgroundColor: value.color }}
                              onClick={() =>
                                 handleCategoryChoice(value.color, value.tag, value.categoryID)
                              }>
                              {value.tag}
                           </span>
                        ))}
                     </section>
                  )}
               </>
            )}
         </div>

         {/* ======================== MOBILE MENU  ============= */}
         <div className={`${libraryMenuStyles.mainWrapper}`}>
            {includeContent && (
               <>
                  {!openContentDropDState && (
                     <div
                        className={`${libraryMenuStyles.contentDropDownButton}`}
                        onClick={handleOpenContent}>
                        {contentButtonIcon}
                     </div>
                  )}
                  {openContentDropDState && (
                     <div
                        className={`${libraryMenuStyles.contentDropDownButton}`}
                        onClick={handleCloseContent}>
                        {contentButtonIcon}
                     </div>
                  )}
                  {openContentDropDState && (
                     <section className={`${libraryMenuStyles.contentDropDWrapper}`}>
                        <Link href={"/library"}>
                           <a className={`${libraryMenuStyles.contentSingleItem}`}>🔥</a>
                        </Link>
                        <Link href={"/library/sermon-notes"}>
                           <a className={`${libraryMenuStyles.contentSingleItem}`}>🗣️</a>
                        </Link>
                        <Link href='/library/articles'>
                           <a className={`${libraryMenuStyles.contentSingleItem}`}>📃</a>
                        </Link>
                        <Link href={"/library/podcast"}>
                           <a className={`${libraryMenuStyles.contentSingleItem}`}>🎧</a>
                        </Link>
                        <Link href={"/library/watch"}>
                           <a className={`${libraryMenuStyles.contentSingleItem}`}>📺</a>
                        </Link>
                        <Link href={"/library/blogs"}>
                           <a className={`${libraryMenuStyles.contentSingleItem}`}>💻</a>
                        </Link>
                        <Link href={"/library/books"}>
                           <a className={`${libraryMenuStyles.contentSingleItem}`}>📚</a>
                        </Link>
                        <Link href={"/library/locations"}>
                           <a className={`${libraryMenuStyles.contentSingleItem}`}>⛪</a>
                        </Link>
                     </section>
                  )}
               </>
            )}
            {includeSearch && (
               <div className={`${libraryMenuStyles.searchWapper}`}>
                  <input
                     type='text'
                     maxLength={50}
                     className={`${libraryMenuStyles.search} std-input`}
                     placeholder='Search a title'
                     ref={searchInputValue}
                  />
                  <span
                     className={`${libraryMenuStyles.magnifyingGlass} std-button`}
                     onClick={() => {
                        searchInputValue.current
                           ? handleInputSearchReq(searchInputValue.current.value.trim())
                           : null;
                     }}>
                     🔎
                  </span>
               </div>
            )}
            {includeCategory && (
               <>
                  {!openCatDropdownState && (
                     <div
                        style={{ backgroundColor: currentCategorySelectedState.color }}
                        className={`${libraryMenuStyles.categoryButton}`}
                        onClick={handleOpenCategoryDropDown}>
                        {currentCategorySelectedState.tag}
                     </div>
                  )}
                  {openCatDropdownState && (
                     <div
                        style={{ backgroundColor: currentCategorySelectedState.color }}
                        className={`${libraryMenuStyles.categoryButton}`}
                        onClick={handleCloseCategoryDropDown}>
                        {currentCategorySelectedState.tag}
                     </div>
                  )}
                  {openCatDropdownState && (
                     <section className={`${libraryMenuStyles.categoryDropDWrapper}`}>
                        <span
                           onClick={resetCategorySelector}
                           className={`${libraryMenuStyles.contentSingleItem} ${libraryMenuStyles.allOption}`}>
                           #ALL
                        </span>
                        {valuesCat.map((value: IvaluesCat) => (
                           <span
                              key={value.key}
                              className={`${libraryMenuStyles.contentSingleItem}`}
                              style={{ backgroundColor: value.color }}
                              onClick={() =>
                                 handleCategoryChoice(value.color, value.tag, value.categoryID)
                              }>
                              {value.tag}
                           </span>
                        ))}
                     </section>
                  )}
               </>
            )}
         </div>
      </>
   );
};

export default libraryMenu;