import { useRouter } from "next/router";
import { useState, useEffect } from "react";

// comps
import { Secondary } from "./buttons/secondary";

//styles
import styles from "./commentary_filter.module.css";

export const CommentaryFilter = () => {
   // router
   const router = useRouter();

   // state
   const [buttonActive, setbuttonActive] = useState<string | string[] | null>(null);

   ///get router info
   useEffect(() => {
      if (router.isReady) {
         setbuttonActive(router.query["AUTHORITY_LEVEL"] || "1");
      }
   }, [router.isReady, router.query]);

   const handleFilter = (AUTHORITY_LEVEL: number) => {
      router.push({
         pathname: router.pathname,
         query: {
            ...router.query,
            AUTHORITY_LEVEL
         }
      });
   };

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.all}>
            <Secondary
               type={buttonActive === "1" ? "2" : "1"}
               title='General'
               icon='🌎'
               fullWidth
               cta={{ handleClick: () => handleFilter(1) }}
            />
         </div>
         <div className={styles.trusted}>
            <Secondary
               type={buttonActive === "2" ? "2" : "1"}
               title='Trusted'
               icon='⭐️'
               fullWidth
               cta={{ handleClick: () => handleFilter(2) }}
            />
         </div>
         <div className={styles.classic}>
            <Secondary
               type={buttonActive === "3" ? "2" : "1"}
               title='Classic'
               icon='🎩'
               fullWidth
               cta={{ handleClick: () => handleFilter(3) }}
            />
         </div>
      </div>
   );
};
