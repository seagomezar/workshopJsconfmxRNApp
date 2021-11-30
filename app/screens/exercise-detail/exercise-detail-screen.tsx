import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { ExerciseDetailItem, GradientBackground, Header, Screen } from "../../components"
import { Exercise } from "../../screens/exercises/exercises-screen"
import { color, spacing, typography } from "../../theme"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[2],
}

const HEADER: TextStyle = {
  paddingTop: spacing[1],
  paddingBottom: 0,
  paddingHorizontal: 0,
}

const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }

const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
}

export const ExerciseDetailScreen: FC<
  StackScreenProps<NavigatorParamList, "exerciseDetail">
> = observer(function ExerciseDetailScreen(props) {
  const goBack = () => props.navigation.goBack()

  return (
    <View testID="ExerciseDetailScreen" style={FULL}>
      <GradientBackground colors={["#422443", "#281b34"]} />
      <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
        <Header
          leftIcon="back"
          onLeftPress={goBack}
          headerText={props.route.params.exercise.name}
          style={HEADER}
          titleStyle={TITLE}
        />
        <ExerciseDetailItem exercise={props.route.params.exercise} />
      </Screen>
    </View>
  )
})