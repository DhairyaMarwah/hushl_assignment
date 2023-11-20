import * as React from "react"
import Svg, { Path } from "react-native-svg"
const Save = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={60}
    height={60}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M41.93 19.487v21.02c0 3.445-3.721 5.605-6.713 3.895l-4.51-2.577a1.495 1.495 0 0 0-1.484 0l-4.51 2.577c-2.991 1.71-6.713-.45-6.713-3.896V19.487A4.487 4.487 0 0 1 22.487 15h14.957a4.487 4.487 0 0 1 4.486 4.487Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default Save
