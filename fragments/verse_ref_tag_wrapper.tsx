/*********************************************************************************************
-  gets an array of verse Id's trhough the parent an maps over them.
-  returns an array with the total count of tags the parent
*********************************************************************************************/

import { useEffect, useState } from "react";

// comps
import { TBiblePreferences } from "../buttons/bible_version_scripture";
import { VerseRefTag } from "./chunks/verse_ref_tag";
import { Header } from "./Typography/header";

// styles
import styles from "./verse_ref_tag_wrapper.module.css";

type TVerseRefTagWrapperProps = {
   refs: string[];
   showRemoveoption?: boolean;
   cta?: {
      handleUpdateTagArray: (tags: string[]) => void;
   };
};

export const VerseRefTagWrapper = ({ refs, showRemoveoption, cta }: TVerseRefTagWrapperProps) => {
   // states
   const [versionId, setVersionId] = useState<null | string>(null);
   const [allTags, setallTags] = useState<string[]>(refs);

   //! check if the user has reading preferences to use that versionId. Might be able to refactor this. #COMEBACK
   const getLS = () => {
      const versionId = localStorage.getItem("reading-preferences");

      if (versionId) {
         const prefs: TBiblePreferences = JSON.parse(versionId);
         setVersionId(prefs.versionId);
      } else {
         setVersionId("de4e12af7f28f599-02");
      }
   };

   useEffect(() => {
      setallTags(refs);
      getLS();
   }, [refs]);

   // ------------------- remove the tags
   const handleRemoveTag = (tagId: string) => {
      const removedtag: string[] = allTags.filter((tag) => tag !== tagId);
      setallTags(removedtag);

      // update the tag array and pass it to the parent
      cta?.handleUpdateTagArray(removedtag);
   };

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.title}>
            <Header type={5} size='main' quiet={true} text='References' />
         </div>
         {!showRemoveoption && (
            <div className={styles.tagsWrapper}>
               {versionId &&
                  allTags.map((ref: string, index: number) => (
                     <div className={styles.tag} key={index}>
                        <VerseRefTag
                           reference={ref}
                           showRemoveoption={false}
                           versionId={versionId}
                        />
                     </div>
                  ))}
            </div>
         )}

         {showRemoveoption && (
            <div className={styles.tagsWrapper}>
               {versionId &&
                  allTags.map((ref: string, index: number) => (
                     <div className={styles.tag} key={index}>
                        <VerseRefTag
                           reference={ref}
                           showRemoveoption={true}
                           cta={() => handleRemoveTag(ref)}
                           versionId={versionId}
                        />
                     </div>
                  ))}
            </div>
         )}
      </div>
   );
};
