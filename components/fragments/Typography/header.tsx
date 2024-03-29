import styles from "./header.module.css";

type THeaderProps = {
   align?: string;
   color?: string;
   lineHieght?: string;
   quiet?: boolean;
   size: string;
   type: number;
   text: string | number | JSX.Element;
   className?: string;
   style?: any;
   weight?: number;
};

export const Header = ({
   type,
   size,
   quiet,
   weight,
   color,
   align,
   text,
   style,
   className,
   lineHieght
}: THeaderProps) => {
   // defaults
   let fontSize: string = "";
   let fontAlign: string = "";
   let fontColor: string = quiet ? styles.quiet : color ? styles.inherit : styles.default;
   let fontWeight = "";
   let fontLineHeight = lineHieght ? lineHieght : "1.6em";

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

   // determine the thickness
   switch (weight) {
      case 400:
         fontWeight = styles.b4;
         break;
      case 500:
         fontWeight = styles.b5;
         break;
      case 700:
         fontWeight = styles.b7;
         break;
      case 800:
         fontWeight = styles.b9;
         break;
   }

   return (
      <div style={{ color: color, ...style }} className={className}>
         {type === 1 && (
            <h1
               className={`${styles.header} ${fontAlign} ${fontSize} ${fontWeight} ${fontColor}`}
               style={{ lineHeight: fontLineHeight }}>
               {text}
            </h1>
         )}

         {type === 2 && (
            <h2
               className={`${styles.header} ${fontAlign} ${fontSize} ${fontWeight} ${fontColor}`}
               style={{ lineHeight: fontLineHeight }}>
               {text}
            </h2>
         )}

         {type === 3 && (
            <h3
               className={`${styles.header} ${fontAlign} ${fontSize} ${fontWeight} ${fontColor}`}
               style={{ lineHeight: fontLineHeight }}>
               {text}
            </h3>
         )}

         {type === 4 && (
            <h4
               className={`${styles.header} ${fontAlign} ${fontSize} ${fontWeight} ${fontColor}`}
               style={{ lineHeight: fontLineHeight }}>
               {text}
            </h4>
         )}

         {type === 5 && (
            <h5
               className={`${styles.header} ${fontAlign} ${fontSize} ${fontWeight} ${fontColor}`}
               style={{ lineHeight: fontLineHeight }}>
               {text}
            </h5>
         )}

         {type === 6 && (
            <h6
               className={`${styles.header} ${fontAlign} ${fontSize} ${fontWeight} ${fontColor}`}
               style={{ lineHeight: fontLineHeight }}>
               {text}
            </h6>
         )}
      </div>
   );
};
