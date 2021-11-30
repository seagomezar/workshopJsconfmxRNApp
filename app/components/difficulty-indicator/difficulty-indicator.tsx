import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { flatten } from "ramda"
import { useEffect, useState } from "react"

const CONTAINER = {
  marginTop: 10,
}

const BAR = {
  height: 10,
  width: "80%",
  backgroundColor: color.dim,
  borderRadius: 40,
}

const BAR_CONTAINER = {
  height: "100%",
  width: "0%",
  backgroundColor: color.transparent,
  borderRadius: 40,
  textAlign: "right",
}
const BAR_CONTAINER_BEGINNER = {
  ...BAR_CONTAINER,
  width: "33%",
  backgroundColor: color.palette.green,
}
const BAR_CONTAINER_INTERMEDIATE = {
  ...BAR_CONTAINER,
  width: "66%",
  backgroundColor: color.palette.orange,
}
const BAR_CONTAINER_EXPERT = {
  ...BAR_CONTAINER,
  width: "99%",
  backgroundColor: color.palette.angry,
}

const TEXT: TextStyle = {
  padding: 10,
  color: color.dim,
}

enum DifficultyLevel {
  Begginner = "beginner",
  Intermediate = "intermediate",
  expert = "expert",
}

export interface DifficultyIndicatorProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  level: string
}

/**
 * Describe your component here
 */
export const DifficultyIndicator = observer(function DifficultyIndicator(
  props: DifficultyIndicatorProps,
) {
  const { style } = props
  const styles = flatten([CONTAINER, style])

  const [barStyle, setBarStyle] = useState(BAR_CONTAINER)

  useEffect(() => {
    if (props.level === DifficultyLevel.Begginner) {
      setBarStyle(BAR_CONTAINER_BEGINNER)
    } else if (props.level === DifficultyLevel.Intermediate) {
      setBarStyle(BAR_CONTAINER_INTERMEDIATE)
    } else if (props.level === DifficultyLevel.expert) {
      setBarStyle(BAR_CONTAINER_EXPERT)
    }
  }, [])

  return (
    <View style={styles}>
      {/* <Text>{capitalizeFirstLetter(props.level)}</Text> */}
      <View style={BAR}>
        <View style={barStyle}></View>
      </View>
    </View>
  )
})
