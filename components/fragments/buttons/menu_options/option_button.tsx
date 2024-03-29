/***********************************************************************************************************************************
-  renders a button or a <a></a> based on the "link" prop which represents the link to be redirected to and at the same time
   acts as the determining property that decides whether to render the button or te eanchor tag
-  props.backgroundColor === 1 returns purple
-  props.backgroundColor === 2 returns orange
-  props.backgroundColor === "#FFF" returns white
***********************************************************************************************************************************/

import Link from "next/link";

// comps
import { Parragraph } from "../../Typography/parragraph";

// styles
import styles from "./option_button.module.css";

export type TOptionButtonProps = {
   option: string;
   backgroundColor: string;
   buttonSize?: string;
   link?: string;
   shadowColor?: string;
   cta?: () => void;
};

export const OptionButton = ({
   option,
   buttonSize,
   backgroundColor,
   link,
   cta,
   shadowColor = "1"
}: TOptionButtonProps) => {
   return (
      <>
         {backgroundColor === "1" &&
            (!link ? (
               <button
                  className={`${styles.mainWrapper} ${buttonSize && styles.mainWrapperCustomSize} ${
                     styles.primary
                  } ${shadowColor === "1" ? styles.shadowDark : styles.shadowLight}`}
                  onClick={cta}>
                  <Parragraph text={option} size='xlarge' align='center' bold={true} />
               </button>
            ) : (
               <Link href={link ? link : "#"}>
                  <a
                     className={`${styles.mainWrapper} ${
                        buttonSize && styles.mainWrapperCustomSize
                     } ${styles.primary} ${
                        shadowColor === "1" ? styles.shadowDark : styles.shadowLight
                     }`}>
                     <Parragraph text={option} size='xlarge' align='center' bold={true} />
                  </a>
               </Link>
            ))}

         {backgroundColor === "2" &&
            (!link ? (
               <button
                  className={`${styles.mainWrapper} ${buttonSize && styles.mainWrapperCustomSize} ${
                     styles.secondary
                  } ${shadowColor === "1" ? styles.shadowDark : styles.shadowLight}`}
                  onClick={cta}>
                  <Parragraph text={option} size='xlarge' align='center' bold={true} />
               </button>
            ) : (
               <Link href={link ? link : "#"}>
                  <a
                     className={`${styles.mainWrapper} ${
                        buttonSize && styles.mainWrapperCustomSize
                     } ${styles.secondary} ${
                        shadowColor === "1" ? styles.shadowDark : styles.shadowLight
                     }`}>
                     <Parragraph text={option} size='xlarge' align='center' bold={true} />
                  </a>
               </Link>
            ))}

         {backgroundColor !== "1" &&
            backgroundColor !== "2" &&
            (!link ? (
               <button
                  className={`${styles.mainWrapper} ${buttonSize && styles.mainWrapperCustomSize} ${
                     shadowColor === "1" ? styles.shadowDark : styles.shadowLight
                  }`}
                  style={{ backgroundColor }}
                  onClick={cta}>
                  <Parragraph text={option} size='xlarge' align='center' bold={true} />
               </button>
            ) : (
               <Link href={link ? link : "#"}>
                  <a
                     className={`${styles.mainWrapper} ${
                        buttonSize && styles.mainWrapperCustomSize
                     } ${shadowColor === "1" ? styles.shadowDark : styles.shadowLight}`}
                     style={{ backgroundColor }}>
                     <Parragraph text={option} size='xlarge' align='center' bold={true} />
                  </a>
               </Link>
            ))}
      </>
   );
};
