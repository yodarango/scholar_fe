import { Parragraph } from "../Typography/parragraph";
import styles from "./user_rating.module.css";

export type Trating = {
   average_count: number;
   total_count: number;
};

type TuserRatingProps = {
   rating: Trating | null;
   cta: React.MouseEventHandler<HTMLDivElement>;
   customSize?: boolean;
};

export const UserRating = ({ rating, cta, customSize }: TuserRatingProps) => {
   return (
      <div
         className={`${customSize ? styles.mainWrapperCustomSize : styles.mainWrapper} flex-row`}
         onClick={cta}>
         <Parragraph text={rating?.total_count ? rating?.total_count : ""} size='xsmall' />
         <div onClick={cta} className={styles.ratingIcon}>
            {rating && rating.total_count == 0 && (
               <p className={styles.noRatings}>
                  <Parragraph size='xsmall' text='R' inline={true} align='center' />
               </p>
            )}
            {rating && rating.average_count >= 97 && (
               <p className={`${styles.ratingA}`}>
                  <Parragraph size='xsmall' text='A+' inline={true} align='center' />
               </p>
            )}
            {rating && rating.average_count >= 94 && rating.average_count < 97 && (
               <p className={`${styles.ratingA}`}>
                  <Parragraph size='xsmall' text='A' inline={true} align='center' />
               </p>
            )}
            {rating && rating.average_count >= 90 && rating.average_count < 94 && (
               <p className={`${styles.ratingA}`}>
                  <Parragraph size='xsmall' text='A-' inline={true} align='center' />
               </p>
            )}
            {rating && rating.average_count >= 87 && rating.average_count < 90 && (
               <p className={`${styles.ratingB}`}>
                  <Parragraph size='xsmall' text='B+' inline={true} align='center' />
               </p>
            )}
            {rating && rating.average_count >= 83 && rating.average_count < 87 && (
               <p className={`${styles.ratingB}`}>
                  <Parragraph size='xsmall' text='B' inline={true} align='center' />
               </p>
            )}
            {rating && rating.average_count >= 80 && rating.average_count < 83 && (
               <p className={`${styles.ratingB}`}>
                  <Parragraph size='xsmall' text='B-' inline={true} align='center' />
               </p>
            )}
            {rating && rating.average_count >= 77 && rating.average_count < 80 && (
               <p className={`${styles.ratingC}`}>
                  <Parragraph size='xsmall' text='C+' inline={true} align='center' />
               </p>
            )}
            {rating && rating.average_count >= 73 && rating.average_count < 77 && (
               <p className={`${styles.ratingC} `}>
                  <Parragraph size='xsmall' text='C' inline={true} align='center' />
               </p>
            )}
            {rating && rating.average_count >= 70 && rating.average_count < 73 && (
               <p className={`${styles.ratingC}`}>
                  <Parragraph size='xsmall' text='C-' inline={true} align='center' />
               </p>
            )}
            {rating && rating.average_count >= 67 && rating.average_count < 70 && (
               <p className={`${styles.ratingC}`}>
                  <Parragraph size='xsmall' text='D+' inline={true} align='center' />
               </p>
            )}
            {rating && rating.average_count > 60 && rating.average_count < 67 && (
               <p className={`${styles.ratingC}`}>
                  <Parragraph size='xsmall' text='D' inline={true} align='center' />
               </p>
            )}
            {rating && rating.average_count <= 60 && rating.average_count > 0 && (
               <p className={`${styles.ratingF}`}>
                  <Parragraph size='xsmall' text='F' inline={true} align='center' />
               </p>
            )}
         </div>
      </div>
   );
};
