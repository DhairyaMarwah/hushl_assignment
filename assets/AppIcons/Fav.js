import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={51}
    height={81}
    fill="none"
    {...props}
  >
    <Path
      stroke="#2D2D2D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3.116}
      d="M25.48 79V50.62M42.174 57.297c-9.22 0-16.694 7.474-16.694 16.695 9.22 0 16.694-7.475 16.694-16.695ZM8.785 57.297c9.22 0 16.695 7.474 16.695 16.695-9.22 0-16.695-7.475-16.695-16.695ZM2.107 13.892v13.355c0 12.909 10.464 23.373 23.372 23.373s23.373-10.464 23.373-23.373V13.892"
    />
    <Path
      stroke="#2D2D2D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3.116}
      d="M8.191 9.064C-6.222 14.554 7.171 20.57 25.48 20.57c12.908 0 23.372-2.99 23.372-6.678 0-14.682-33.389-14.346-33.389-6.677 0 5.785 13.124 5.008 16.694 5.008"
    />
  </Svg>
)
export default SvgComponent
