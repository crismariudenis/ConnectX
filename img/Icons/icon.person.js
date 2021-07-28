import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  const { size, color } = props;
  const bias = 0.5;
  return (
    <Svg
      width={90 * bias} //90
      height={61 * bias} //61
      viewBox="0 0 80 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M40 45c11.05 0 20-10.069 20-22.5S51.05 0 40 0 20 10.069 20 22.5 28.95 45 40 45zm0 11.25c-13.35 0-40 7.538-40 22.5V90h80V78.75c0-14.962-26.65-22.5-40-22.5z"
        fill={color}
      />
    </Svg>
  );
}

export default SvgComponent
