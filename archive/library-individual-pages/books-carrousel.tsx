// ************************** PURPOSE **************************** //
// *** This is only a wrapper to display each individual ********* //
// *** watch component by calling a map on the props  ************ //
// *** passed in this component, which is an array of the ******** //
// *** watch fetched from the library. *************************** //

// core
import React from "react";

//components
import Book from "../../fragments/library-items/book";

// styles
import bookCarrouselStyles from "../../styles/layouts/library-individual-pages/BooksCarrousel.module.css";

// helpers:types
import { bookProps } from "../../fragments/library-items/book";

type bookCarrouselProps = {
   books: bookProps[];
};

const BookCarrousel = ({ books }: bookCarrouselProps) => {
   return (
      <div className={bookCarrouselStyles.mainWrapper}>
         {books.length > 0 && (
            <div className={bookCarrouselStyles.gridWrapper}>
               {books.map((book: bookProps) => (
                  <Book
                     id={book.id}
                     key={book.id}
                     title={book.title}
                     author={book.author}
                     totalReviews={book.totalReviews}
                     currentRanking={book.currentRanking}
                     bookUrl={book.bookUrl}
                     newClass={bookCarrouselStyles.bookMainWrapper}
                     categoryTags={book.categoryTags}
                     tagColors={book.tagColors}
                     description={book.description}
                     thumbnail={book.thumbnail}
                  />
               ))}
            </div>
         )}
         {books.length === 0 && <h2 className={"no-content-text"}>no content found</h2>}
      </div>
   );
};

export default BookCarrousel;