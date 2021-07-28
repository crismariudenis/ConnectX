import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  const { size, color } = props;
  const bias = 0.5;
  //console.log(color);
  return (
    <Svg
      width={90 * bias} //90
      height={61 * bias} //61
      viewBox="0 0 90 61"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M33.3 53.205L12.6 30.116 33.3 7.027 27 0 0 30.116l27 30.116 6.3-7.027zm23.4 0l20.7-23.089L56.7 7.027 63 0l27 30.116-27 30.116-6.3-7.027z"
        fill={color}
      />
    </Svg>
  );
}

export default SvgComponent;
