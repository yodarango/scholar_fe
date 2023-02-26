import Link from "next/link";

// components
import { QuoteCardHeader } from "../../chunks/quote_card_header";
import { Parragraph } from "../../Typography/parragraph";
import { Header } from "../../Typography/header";
import { PostReactions } from "../../post_reactions";

// styles
import styles from "./quote.module.css";

//types
import { TQuote } from "../../../../types/posts";
import { EnumContentType } from "../../../../types/enums";

export type TQuoteProps = {
   quote: TQuote;
   type?: number;
   cta: {
      handleDelete: (id: string) => void;
   };
};

export const Quote = ({ quote, cta, type = 0 }: TQuoteProps) => {
   let darkContext: boolean =
      quote.background === "quote-bkg--5" ||
      quote.background === "quote-bkg--11" ||
      quote.background === "quote-bkg--12" ||
      quote.background === "quote-bkg--13" ||
      quote.background === "quote-bkg--20";

   const actionsColor = darkContext ? "#2a2438" : "#F1EAFF";

   return (
      <div
         className={`${styles.mainWrapper} ${type === 1 && styles.mainWrapperWide}`}
         id={quote?.background}>
         <Link href={`/posts/quote/${quote.ID}`}>
            <a className={styles.clickableArea}></a>
         </Link>
         {/* ------------------------------ header ----------------------- */}
         <div className={styles.header}>
            <QuoteCardHeader
               dark={darkContext}
               contentType={EnumContentType.quote}
               cta={{ handleDelete: cta.handleDelete }}
               postId={quote?.ID}
               userId={quote?.creator?.ID}
               userAuthority={quote?.creator?.authority_level}
               avatar={quote?.creator?.avatar}
            />
         </div>

         {/* ------------------------------ body ----------------------- */}
         <div className={`${styles.body} ${type === 1 && styles.bodyWide}`}>
            <Header
               color={darkContext ? "#2a2438" : "#f1eaff"}
               type={3}
               size={type === 1 ? "main" : "xxsmall"}
               text={quote?.body}
               align='center'
            />
            <div className={styles.author}>
               <Parragraph
                  color={darkContext ? "#2a2438" : "#f1eaff"}
                  size={type === 1 ? "small" : "xxsmall"}
                  text={`—	${quote.creator?.signature}`}
                  align='center'
               />
            </div>
         </div>

         <div className={styles.footer}>
            <PostReactions
               iconColor={actionsColor}
               postId={quote?.ID}
               userId={quote?.creator?.ID}
               contentType={2}
               postRating={{
                  totalCount: quote?.approvals?.total_count,
                  averageCount: quote?.approvals?.average_count
               }}
               totalComments={quote?.comments?.total_count}
            />
         </div>
      </div>
   );
};
