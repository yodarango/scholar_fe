import Link from "next/link";
import { Parragraph } from "../Typography/parragraph";
import styles from "./secondary.module.css";

type TPrimaryProps = {
   icon?: string;
   type: string;
   title: string;
   url?: string;
   fullWidth?: boolean;
   cta?: {
      handleClick: () => void;
   };
};

export const Secondary = ({ title, cta, type, icon, url, fullWidth }: TPrimaryProps) => {
   return (
      <>
         {type === "1" && (
            <div
               className={`${styles.mainWrapper} ${icon && styles.withIcon} ${
                  fullWidth && styles.fullWidth
               }`}>
               {/* ----------------------- if the includes text only render this-----------------  */}
               <button
                  className={`${styles.primary} ${icon && styles.withIcon} ${
                     fullWidth && styles.fullWidth
                  }`}
                  onClick={cta?.handleClick}>
                  {!icon && (
                     <Parragraph
                        text={title}
                        size='main'
                        bold={true}
                        lineHieght='.9em'
                        align='center'
                     />
                  )}
                  {/* ----------------------- if the button includes an icon render this-----------------  */}
                  {icon && (
                     <>
                        <span className={styles.icon}>{icon}</span>
                        <Parragraph text={title} size='main' bold={true} lineHieght='.9em' />
                     </>
                  )}
               </button>
            </div>
         )}

         {type === "2" && (
            <div
               className={`${styles.mainWrapper} ${icon && styles.withIcon} ${
                  fullWidth && styles.fullWidth
               }`}>
               <button
                  className={`${styles.secondary} ${icon && styles.withIcon} ${
                     fullWidth && styles.fullWidth
                  }`}
                  onClick={cta?.handleClick}>
                  {/* ----------------------- if the includes text only render this-----------------  */}
                  {!icon && (
                     <Parragraph
                        text={title}
                        size='main'
                        bold={true}
                        lineHieght='.9em'
                        align='center'
                     />
                  )}
                  {/* ----------------------- if the button includes an icon render this-----------------  */}
                  {icon && (
                     <>
                        <span className={styles.icon}>{icon}</span>
                        <Parragraph text={title} size='main' bold={true} lineHieght='.9em' />
                     </>
                  )}
               </button>
            </div>
         )}

         {/* link buttons  */}
         {type === "3" && url && (
            <div
               className={`${styles.mainWrapper} ${icon && styles.withIcon} ${
                  fullWidth && styles.fullWidth
               }`}>
               {/* ----------------------- if the includes text only render this-----------------  */}
               <Link href={url}>
                  <a
                     className={`${styles.primary} ${icon && styles.withIcon} ${
                        fullWidth && styles.fullWidth
                     }`}>
                     {!icon && (
                        <Parragraph
                           text={title}
                           size='main'
                           bold={true}
                           lineHieght='.9em'
                           align='center'
                        />
                     )}
                     {/* ----------------------- if the button includes an icon render this-----------------  */}
                     {icon && (
                        <>
                           <span className={styles.icon}>{icon}</span>
                           <Parragraph text={title} size='main' bold={true} lineHieght='.9em' />
                        </>
                     )}
                  </a>
               </Link>
            </div>
         )}

         {type === "4" && url && (
            <div
               className={`${styles.mainWrapper} ${icon && styles.withIcon} ${
                  fullWidth && styles.fullWidth
               }`}>
               <Link href={url}>
                  <a
                     className={`${styles.secondary} ${icon && styles.withIcon} ${
                        fullWidth && styles.fullWidth
                     }`}>
                     {/* ----------------------- if the includes text only render this-----------------  */}
                     {!icon && (
                        <Parragraph
                           text={title}
                           size='main'
                           bold={true}
                           lineHieght='.9em'
                           align='center'
                        />
                     )}
                     {/* ----------------------- if the button includes an icon render this-----------------  */}
                     {icon && (
                        <>
                           <span className={styles.icon}>{icon}</span>
                           <Parragraph text={title} size='main' bold={true} lineHieght='.9em' />
                        </>
                     )}
                  </a>
               </Link>
            </div>
         )}
      </>
   );
};
