import * as React from "react"
import { FlatList, StyleProp, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { flatten } from "ramda"
import { Exercise } from "../../screens"
import { ExerciseListItem } from ".."

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

export interface ExerciseListContainerProps {
  style?: StyleProp<ViewStyle>
  exercises: Exercise[]
}

export const ExerciseListContainer = observer(function ExerciseListContainer(
  props: ExerciseListContainerProps,
) {
  const { style } = props
  const styles = flatten([CONTAINER, style])

  return (
    <View style={styles}>
      <FlatList
        data={props.exercises}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ExerciseListItem exercise={item} />}
      />
    </View>
  )
})
