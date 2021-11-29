import * as React from "react"
import {
  Image,
  ImageStyle,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"
import { Text } from "../text/text"
import { flatten } from "ramda"
import { Exercise } from "../../screens/exercises/exercises-screen"
import { AutoImage } from ".."
import { useNavigation } from "@react-navigation/native"

const CONTAINER: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  borderWidth: 1,
  borderColor: color.line,
  borderRadius: 10,
  marginBottom: 10,
}
const TEXT_CONTAINER: ViewStyle = {
  width: "50%",
  flexShrink: 0,
  flexGrow: 1,
  paddingLeft: "5%",
}
const IMAGE_CONTAINER: ViewStyle = {
  width: "50%",
  flexShrink: 0,
  flexGrow: 1,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const TEXT: TextStyle = {
  fontFamily: typography.primary,
  color: color.text,
}

const TEXT_TITLE: TextStyle = {
  ...BOLD,
  ...TEXT,
  fontSize: 20,
}

const TEXT_DIM: TextStyle = {
  ...TEXT,
  marginBottom: 5,
  color: color.dim,
}

const IMAGE: ImageStyle = {
  alignSelf: "center",
  marginVertical: spacing[5],
  maxWidth: "100%",
  width: 149,
  height: 100,
  borderRadius: 10,
}

export interface ExerciseListItemProps {
  style?: StyleProp<ViewStyle>
  exercise: Exercise
}
export const ExerciseListItem = observer(function ExerciseListItem(props: ExerciseListItemProps) {
  const { style } = props
  const styles = flatten([CONTAINER, style])
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      style={styles}
    >
      <View style={TEXT_CONTAINER}>
        <Text style={TEXT_TITLE}>{(props.exercise.name)}</Text>
        <Text style={TEXT_DIM}>
          <Text tx="components.exerciseListItem.muscle" />
          {(props.exercise.primaryMuscles.join(""))}
        </Text>
        <Text style={TEXT_DIM}>
          <Text tx="components.exerciseListItem.kind" />
          {(props.exercise.category)}
        </Text>
      </View>
      <View style={IMAGE_CONTAINER}>
        <AutoImage
          style={IMAGE}
          source={{
            uri: `https://raw.githubusercontent.com/seagomezar/Exercises-Compiled-Database/main/images/${props.exercise.images[0]}`,
          }}
        />
      </View>
    </TouchableOpacity>
  )
})