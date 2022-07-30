// styles
import styles from "./post_rating.module.css";

// comps
import { Parragraph } from "../Typography/parragraph";

export type Trating = {
   totalCount: number;
   averageCount: number;
};

type TPostRatingProps = {
   rating: Trating | null;
   cta: React.MouseEventHandler<HTMLDivElement>;
   customSize?: boolean;
};

export const PostRating = ({ rating, cta, customSize }: TPostRatingProps) => {
   return (
      <div className={`${styles.mainWrapper}`} onClick={cta}>
         {/* ----------- ratings count ---------- */}
         <Parragraph text={rating?.totalCount ? rating?.totalCount : ""} size='small' />

         {/* ----------- ratings average in grade ---------- */}
         <div
            onClick={cta}
            className={`${customSize ? styles.ratingIconCustomSize : styles.ratingIcon}`}>
            {rating && rating.totalCount == 0 && (
               <div className={styles.noRatings}>
                  <Parragraph size='xsmall' text='R' align='center' />
               </div>
            )}
            {rating && rating.averageCount >= 97 && (
               <div className={`${styles.ratingA}`}>
                  <Parragraph size='xsmall' text='A+' inline={false} align='center' />
               </div>
            )}
            {rating && rating.averageCount >= 94 && rating.averageCount < 97 && (
               <div className={`${styles.ratingA}`}>
                  <Parragraph size='xsmall' text='A' align='center' />
               </div>
            )}
            {rating && rating.averageCount >= 90 && rating.averageCount < 94 && (
               <div className={`${styles.ratingA}`}>
                  <Parragraph size='xsmall' text='A-' align='center' />
               </div>
            )}
            {rating && rating.averageCount >= 87 && rating.averageCount < 90 && (
               <div className={`${styles.ratingB}`}>
                  <Parragraph size='xsmall' text='B+' align='center' />
               </div>
            )}
            {rating && rating.averageCount >= 83 && rating.averageCount < 87 && (
               <div className={`${styles.ratingB}`}>
                  <Parragraph size='xsmall' text='B' align='center' />
               </div>
            )}
            {rating && rating.averageCount >= 80 && rating.averageCount < 83 && (
               <div className={`${styles.ratingB}`}>
                  <Parragraph size='xsmall' text='B-' align='center' />
               </div>
            )}
            {rating && rating.averageCount >= 77 && rating.averageCount < 80 && (
               <div className={`${styles.ratingC}`}>
                  <Parragraph size='xsmall' text='C+' align='center' />
               </div>
            )}
            {rating && rating.averageCount >= 73 && rating.averageCount < 77 && (
               <div className={`${styles.ratingC} `}>
                  <Parragraph size='xsmall' text='C' align='center' />
               </div>
            )}
            {rating && rating.averageCount >= 70 && rating.averageCount < 73 && (
               <div className={`${styles.ratingC}`}>
                  <Parragraph size='xsmall' text='C-' align='center' />
               </div>
            )}
            {rating && rating.averageCount >= 67 && rating.averageCount < 70 && (
               <div className={`${styles.ratingC}`}>
                  <Parragraph size='xsmall' text='D+' align='center' />
               </div>
            )}
            {rating && rating.averageCount > 60 && rating.averageCount < 67 && (
               <div className={`${styles.ratingC}`}>
                  <Parragraph size='xsmall' text='D' align='center' />
               </div>
            )}
            {rating && rating.averageCount <= 60 && rating.averageCount > 0 && (
               <div className={`${styles.ratingF}`}>
                  <Parragraph size='xsmall' text='F' align='center' />
               </div>
            )}
         </div>
      </div>
   );
};
