/**********************************************************************************************************
-  Just a simple background layer that acts as a layover "page" on top of whatever contnent is calling it.
   It is usefull in cases where the majority of the data to be rendered has already been loaded and thus is
   cheaper to render this data in the current page without having to navigate away. 
-  It is also useful in instances where the data has not been saved to the DB and the data must not be lost
   as in post createion
**********************************************************************************************************/
// comps
import { CloseContent } from "../../../fragments/buttons/close_content";
import { Icon } from "../../../fragments/chunks/icons";
import { Header } from "../../../fragments/Typography/header";

// styles
import styles from "./primary_stack.module.css";

type TPrimaryStackprops = {
   title: string;
   children: (string | JSX.Element) | (string | JSX.Element)[];
   link?: string;
   cta?: {
      handleClose: () => void;
   };
   icon?: string;
};

export const PrimaryStack = ({ title, children, cta, icon, link }: TPrimaryStackprops) => {
   return (
      <div className={styles.mainWrapper}>
         <div className={styles.gradientBkg}>
            <div className={styles.title}>
               <Header size='large' type={1} text={title} lineHieght='.9em' />
               {icon && (
                  <div className={styles.icon}>
                     <Icon size='2rem' name={icon} color='#F1EAFF' />
                  </div>
               )}
            </div>
         </div>
         {cta && !link && (
            <div className={styles.close}>
               <CloseContent cta={{ handleClick: cta.handleClose }} />
            </div>
         )}
         {!cta && link && (
            <div className={styles.close}>
               <CloseContent href={link} />
            </div>
         )}
         <div className={styles.subWrapper}>
            <div className={styles.contentHolder}>{children}</div>
         </div>
      </div>
   );
};
