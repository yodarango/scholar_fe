// comps
import React from "react";
import { MenuPrimaryOptionWithSubSelection } from "../../fragments/buttons/menu_options/menu_primary_option_w_sub_selection";
import { Icon } from "../../fragments/chunks/icons";
import { PrimaryMenuBkg } from "../../fragments/popups/primary_menu_bkg";

//styles
import styles from "./select_menu_global.module.css";

export type TSelectReadingSettingsProps = {
   cta: {
      handleCloseModal: () => void;
      handleFontSelection: (value: string) => void;
      handleThemeSelection: (value: string) => void;
   };
};

export const SelectReadingSettings = ({ cta }: TSelectReadingSettingsProps) => {
   return (
      <PrimaryMenuBkg color='2' title='Settings' cta={{ handleClose: cta.handleCloseModal }}>
         <>
            {/* ------------- font size ------------ */}
            <div className={styles.menuOption} key={1}>
               <MenuPrimaryOptionWithSubSelection
                  type='2'
                  textType='text'
                  iconType='text'
                  customSubSelections={[
                     { value: "main", title: "Default" },
                     { value: "small", title: "Small" },
                     { value: "large", title: "Big" },
                     { value: "xlarge", title: "Bigger" }
                  ]}
                  cta={{ handleSelection: cta.handleFontSelection }}
                  optionProperties={{
                     icon: "A",
                     iconShadow: "#F1EAFF",
                     text: "Font size"
                  }}
               />
            </div>

            {/* ------------- theme ------------ */}
            <div className={styles.menuOption} key={2}>
               <MenuPrimaryOptionWithSubSelection
                  type='3'
                  textType='text'
                  iconType='icon'
                  cta={{ handleSelection: cta.handleThemeSelection }}
                  customSubSelections={[
                     { value: "1", title: "#2B2B2A" },
                     { value: "2", title: "#050825" },
                     { value: "3", title: "#1E1F1E" },
                     { value: "4", title: "#F1EAFF" }
                  ]}
                  optionProperties={{
                     icon: <Icon color='#F1EAFF' size='2rem' name='brush' />,
                     iconShadow: "#F1EAFF",
                     text: "Theme"
                  }}
               />
            </div>
         </>
      </PrimaryMenuBkg>
   );
};