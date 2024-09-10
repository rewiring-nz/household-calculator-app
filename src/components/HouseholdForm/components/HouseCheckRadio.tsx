import React, { ForwardedRef, forwardRef, useState } from 'react';
import { Checkbox, CheckboxProps, Radio, RadioProps } from '@mui/material';
import HouseUncheckedIcon from '../../../assets/icons/Radio-unchecked.svg';
import HouseCheckedIcon from '../../../assets/icons/Radio-checked.svg';



export const HouseRadio: React.FC<RadioProps> = (props) => {  
  return (
    <Radio
      disableRipple
      color="default"
      // checkedIcon={<img src={HouseCheckedIcon} alt="HouseCheckedIcon" />}
      // icon={<img src={HouseUncheckedIcon} alt="HouseIcon" />}
      {...props}
    />
  );
};




// export const HouseCheck: React.FC<CheckboxProps> = (props) => {
  
//   const invertedChecked = !props.checked;

//   return (
//     // <HouseRadio
//     <Checkbox
//       disableRipple
//       color="default"
//       checkedIcon={<img src={HouseCheckedIcon} alt="HouseCheckedIcon" />}
//       icon={<img src={HouseUncheckedIcon} alt="HouseIcon" />}
//       {...props}
//       checked={invertedChecked}   
//     />
//   );
// };


// export const HouseCheck = forwardRef<HTMLButtonElement, CheckboxProps>((props, ref: ForwardedRef<HTMLButtonElement>) => {
//   // const invertedChecked = !props.checked;

//   return (
//     <Checkbox
//       disableRipple
//       color="default"
//       checkedIcon={<img src={HouseCheckedIcon} alt="HouseCheckedIcon" />}
//       icon={<img src={HouseUncheckedIcon} alt="HouseIcon" />}
//       {...props}
//       // checked={invertedChecked}
//       ref={ref}
//     />
//   );
// });

export default HouseRadio;