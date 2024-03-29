// react
import { useState } from "react";

// styles
import styles from "./parragraph.module.css";

type TParragraphProps = {
   size: string;
   text: string | number | JSX.Element;
   align?: string;
   bold?: boolean;
   inline?: boolean;
   italics?: boolean;
   color?: string;
   lineHieght?: string;
   quiet?: boolean;
   href?: string;
   className?: string;
   style?: any;
};

export const Parragraph = ({
   size,
   quiet,
   text,
   align,
   color,
   inline,
   italics,
   bold,
   lineHieght,
   className,
   style,
   href
}: TParragraphProps) => {
   // states
   let fontSize: string = "";
   let fontAlign: string = "";
   let fontLineHeight = lineHieght ? lineHieght : "1.6em";
   let fontColor: string = quiet ? styles.quiet : color ? styles.inherit : styles.default;

   // determine the size
   switch (size) {
      case "xxsmall":
         fontSize = styles.xxsmall;
         break;
      case "xsmall":
         fontSize = styles.xsmall;
         break;
      case "small":
         fontSize = styles.small;
         break;
      case "main":
         fontSize = styles.main;
         break;
      case "large":
         fontSize = styles.large;
         break;
      case "xlarge":
         fontSize = styles.xlarge;
         break;
      case "xxlarge":
         fontSize = styles.xxlarge;
         break;
      case "xxxlarge":
         fontSize = styles.xxxlarge;
         break;
   }

   // determine the alignment
   switch (align) {
      case "right":
         fontAlign = styles.right;
         break;
      case "center":
         fontAlign = styles.center;
         break;
      case "justify":
         fontAlign = styles.justify;
         break;
   }

   return (
      <div
         style={{ color: color, ...style }}
         className={`${className} ${inline ? styles.inline : ""}`}>
         {!inline &&
            !italics &&
            !bold &&
            (!href ? (
               <p
                  className={`${styles.parragraph} ${fontSize} ${fontAlign} ${fontColor}`}
                  style={{ lineHeight: fontLineHeight }}>
                  {text}
               </p>
            ) : (
               <a href={href}>
                  <p
                     className={`${styles.parragraph} ${fontSize} ${fontAlign} ${fontColor}`}
                     style={{ lineHeight: fontLineHeight }}>
                     {text}
                  </p>
               </a>
            ))}

         {inline &&
            !italics &&
            !bold &&
            (!href ? (
               <span
                  className={`${styles.parragraph} ${styles.inline} ${fontSize} ${fontAlign} ${fontColor}`}
                  style={{ lineHeight: fontLineHeight }}>
                  {text}
               </span>
            ) : (
               <a href={href}>
                  <span
                     className={`${styles.parragraph} ${styles.inline} ${fontSize} ${fontAlign} ${fontColor}`}
                     style={{ lineHeight: fontLineHeight }}>
                     {text}
                  </span>
               </a>
            ))}

         {italics &&
            (!href ? (
               <i
                  className={`${styles.parragraph} ${fontSize} ${fontAlign} ${fontColor}`}
                  style={{ lineHeight: fontLineHeight }}>
                  {text}
               </i>
            ) : (
               <a href={href}>
                  <i
                     className={`${styles.parragraph} ${fontSize} ${fontAlign} ${fontColor}`}
                     style={{ lineHeight: fontLineHeight }}>
                     {text}
                  </i>
               </a>
            ))}

         {bold &&
            (!href ? (
               <b
                  className={`${styles.parragraph} ${fontSize} ${fontAlign} ${
                     bold && styles.bold
                  } ${fontColor}`}
                  style={{ lineHeight: fontLineHeight }}>
                  {text}
               </b>
            ) : (
               <a href={href}>
                  <b
                     className={`${styles.parragraph} ${fontSize} ${fontAlign} ${
                        bold ? styles.bold : ""
                     } ${fontColor}`}
                     style={{ lineHeight: fontLineHeight }}>
                     {text}
                  </b>
               </a>
            ))}
      </div>
   );
};
