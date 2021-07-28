import * as React from "react";
import Svg, { Path } from "react-native-svg";

function SvgComponent(props) {
  const { size, color } = props;
  const bias = 0.5;
  return (
    <Svg
      width={90 * bias} //90
      height={61 * bias} //61
      viewBox="0 0 81 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M72.619 0H8.069C3.63 0 .04 4.05.04 9L0 90l16.137-18H72.62c4.438 0 8.069-4.05 8.069-9V9c0-4.95-3.631-9-8.07-9zM16.138 31.5H64.55v9H16.138v-9zM48.413 54H16.138v-9h32.275v9zM64.55 27H16.138v-9H64.55v9z"
        fill={color}
      />
    </Svg>
  );
}

export default SvgComponent;
