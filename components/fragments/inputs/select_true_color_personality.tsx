import { useState } from "react";

// components
import { Parragraph } from "../Typography/parragraph";

// styles
import styles from "./select_true_color_personality.module.css";

type TSelectTrueColorPersonalityProps = {
   currColor?: string;
   label: string;
   cta: {
      handleSelection: (color: string) => void;
   };
};

export const SelectTrueColorPersonality = ({
   label,
   cta,
   currColor = ""
}: TSelectTrueColorPersonalityProps) => {
   // state
   const [colorIsActive, setcolorIsActive] = useState<string>(currColor);

   const colors = [
      { color: "#A1DF9F", label: "green" },
      { color: "#8093F1", label: "blue" },
      { color: "#FCAB64", label: "orange" },
      { color: "#E9D259", label: "golden" }
   ];

   return (
      <div className={styles.mainWrapper}>
         <div className={styles.label}>
            <Parragraph text={label} size='main' />
         </div>
         <div className={styles.colors}>
            {colors.map((item, index: number) => (
               <div
                  className={`${styles.color} ${item.label === colorIsActive ? styles.active : ""}`}
                  key={index}
                  style={{ backgroundColor: item.color, color: item.color }}
                  onClick={() => (
                     cta.handleSelection(item.label), setcolorIsActive(item.label)
                  )}></div>
            ))}
         </div>
      </div>
   );
};
