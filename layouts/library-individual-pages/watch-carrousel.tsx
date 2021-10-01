// ************************** PURPOSE **************************** //
// *** This is only a wrapper to display each individual ********* //
// *** watch component by calling a map on the props  ************ //
// *** passed in this component, which is an array of the ******** //
// *** watch fetched from the library. *************************** //

// core
import React from "react";

//components
import Watch from "../../fragments/library-items/watch";

// styles
import watchCarrouselStyles from "../../styles/layouts/library-individual-pages/WatchCarrousel.module.css";

// helpers:types
import { watchProps } from "../../fragments/library-items/watch";

type watchCarrouselProps = {
   watch: watchProps[];
};

const WatchCarrousel = ({ watch }: watchCarrouselProps) => {
   return (
      <div className={watchCarrouselStyles.mainWrapper}>
         <div className={watchCarrouselStyles.gridWrapper}>
            {watch.map((video: watchProps) => (
               <Watch
                  id={video.id}
                  key={video.id}
                  thumbnail={video.thumbnail}
                  title={video.title}
                  by={video.user === null ? "" : video.user.fullName}
                  userId={video.userId}
                  currentRanking={video.currentRanking}
                  sermonUrl={video.sermonUrl}
                  newClass={watchCarrouselStyles.watchMainWrapper}
               />
            ))}
         </div>
      </div>
   );
};

export default WatchCarrousel;
