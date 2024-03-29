/**************************************************************************************** 
-  Displays an Instagram-like image display from an array of photos passed down to it
****************************************************************************************/

import Image from "next/image";
import React, { useState, useRef } from "react";
import { SlideCounter } from "../chunks/slide_counter";

// styles
import styles from "./content_graphics_post.module.css";

// types
import { TFastFacts } from "../../../types/interactive";

type TContentGraphicsPostProps = {
   content: TFastFacts;
};

export const ContentGraphicsPost = ({ content }: TContentGraphicsPostProps) => {
   // global variables
   let { images } = content;
   let imagesArr = images.split(",");

   // states
   const [isDown, setisDown] = useState<boolean>(false);
   const [startX, setstartX] = useState<number>(0);
   const [scrollLeft, setscrollLeft] = useState<number>(0);
   const [currClass, setcurrClass] = useState<string>("");
   const [currIndex, setcurrIndex] = useState<number>(1);
   const [swipDir, setswipeDir] = useState<any>(0);

   // refs
   const gallery = useRef<HTMLDivElement>(null);

   const mouseDown = (e: any) => {
      setisDown(true);
      setcurrClass(styles.active);
      if (gallery.current) {
         setstartX(e.pageX - gallery.current.offsetLeft);
         setscrollLeft(gallery.current.scrollLeft);
      }
   };

   const mouseLeave = () => {
      setisDown(false);
      setcurrClass("");
   };

   const mouseUp = () => {
      setisDown(false);
      setcurrClass("");

      if (gallery.current) {
         // get the width of the gallery to make sure the user has scrolled at least halfway
         const galleryWidth = gallery.current.getBoundingClientRect();
         const minScroll = galleryWidth.width / 2;

         // check that user scrolled at least past half way
         if (Math.abs(swipDir) > minScroll) {
            if (swipDir < 0 && currIndex < imagesArr.length) {
               setcurrIndex(currIndex + 1); // srcoll fwd
            } else if (swipDir > 0 && currIndex > 0) {
               setcurrIndex(currIndex - 1); // scroll bkd
            }
         }
      }
   };

   const mouseMove = (e: any) => {
      if (!isDown) return;
      e.preventDefault();
      if (gallery.current) {
         const x = e.pageX - gallery.current.offsetLeft;
         const SCROLL_SPEED = 3;
         const walk = (x - startX) * SCROLL_SPEED;
         gallery.current.scrollLeft = scrollLeft - walk;

         setswipeDir(walk);
      }
   };

   return (
      <>
         {imagesArr.length > 0 && (
            <div className={styles.mainWrapper}>
               {/* Deactivating until I can fix */}
               {/* <div className={styles.imagePosition}>
                  <SlideCounter currIndex={currIndex} length={imagesArr.length} />
               </div> */}
               <div
                  className={`${styles.gallery} ${currClass}`}
                  onMouseDown={mouseDown}
                  onMouseLeave={mouseLeave}
                  onMouseUp={mouseUp}
                  onMouseMove={mouseMove}
                  ref={gallery}>
                  {imagesArr.map((image: string, index: number) => (
                     <div className={styles.image} key={index}>
                        <div className={styles.imagePosition}>
                           <SlideCounter currIndex={index + 1} length={imagesArr.length} />
                        </div>
                        <Image src={image} alt='image' className={styles.image} layout='fill' />
                     </div>
                  ))}
               </div>
            </div>
         )}
      </>
   );
};
