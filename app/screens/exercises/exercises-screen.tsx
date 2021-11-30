import React, { FC, useEffect, useState } from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Header, Screen, GradientBackground, ExerciseListContainer } from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import { useStores } from "../../models"

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
const TEXT: TextStyle = {
  color: color.palette.white,
  fontFamily: typography.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }
const HEADER: TextStyle = {
  paddingTop: spacing[3],
  paddingBottom: spacing[4] + spacing[1],
  paddingHorizontal: 0,
}
const HEADER_TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 12,
  lineHeight: 15,
  textAlign: "center",
  letterSpacing: 1.5,
}

export interface Exercise {
  name: string
  force: string
  level: string
  mechanic: string
  equipment: string
  primaryMuscles: string[]
  secondaryMuscles: any[]
  instructions: string[]
  category: string
  images: string[]
  id: string
}

export const ExercisesScreen: FC<StackScreenProps<NavigatorParamList, "exercises">> = observer(
  ({ navigation }) => {
    const { exerciseStore } = useStores()

    // Opcion 1
    const [exercises, setExercises] = useState([])

    // Opcion 2
    // const { exercises } = exerciseStore

    useEffect(() => {
      async function fetchData() {
        // Opcion 1
        const result = await exerciseStore.getExercises()
        setExercises(result)
        // Opcion 2
        // await exerciseStore.getExercises()
      }
      fetchData()
    }, [])

    return (
      <View testID="ExercisesScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
          <Header
            headerTx="exercisesScreen.title"
            style={HEADER}
            leftIcon="back"
            onLeftPress={() => {
              navigation.goBack()
            }}
            titleStyle={HEADER_TITLE}
          />
          <ExerciseListContainer exercises={exercises} />
        </Screen>
      </View>
    )
  },
)
