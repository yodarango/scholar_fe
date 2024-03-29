// comps
import { OptionButton } from "../buttons/menu_options/option_button";
import { Parragraph } from "../Typography/parragraph";

import styles from "./multiple_choice_poll_options.module.css";

type TMultipleChoicePollOptionsProps = {
   options: string[];
   cta: {
      handleVote: (option: string, index: number) => void;
   };
};

export const MultipleChoicePollOptions = ({ options, cta }: TMultipleChoicePollOptionsProps) => {
   // ------------------ alphabet to assign unique letter to each option -----------
   const alphabet = [
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z"
   ];

   return (
      <div className={styles.mainWrapper}>
         {options &&
            options.map((option: string, index: number) => (
               <div className={styles.option} key={index}>
                  <div className={styles.button}>
                     <OptionButton
                        option={alphabet[index]}
                        cta={() => cta.handleVote(option, index)}
                        backgroundColor='1'
                     />
                  </div>
                  <div className={styles.text}>
                     <Parragraph text={option} size='main' />
                  </div>
               </div>
            ))}
      </div>
   );
};
