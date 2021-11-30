import * as React from "react"
import { ImageBackground, ImageStyle, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"
import { Text } from "../text/text"
import { flatten } from "ramda"
import { Button, Icon, DifficultyIndicator } from ".."
import { useEffect, useState } from "react"
import { capitalizeFirstLetter } from "../../utils/strings"
import { Exercise } from "../../screens"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 16,
  color: color.primary,
}

const IMAGE: ImageStyle = {
  alignSelf: "center",
  maxWidth: "100%",
  width: "100%",
  height: 300,
  borderRadius: 10,
  resizeMode: "contain",
  marginVertical: spacing[2],
}

const MAIN_ITEM: ViewStyle = {
  flexDirection: "row",
  borderWidth: 1,
  borderColor: color.dim,
  marginVertical: spacing[1],
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}

const DETAILS_CONTAINER: ViewStyle = {
  flexDirection: "row",
  flexWrap: "wrap",
  width: "100%",
  marginTop: spacing[1],
}

const DETAILS_ITEM: ViewStyle = {
  flexDirection: "row",
  flexBasis: "50%",
  borderWidth: 1,
  borderColor: color.dim,
  marginVertical: spacing[1],
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}

const INSTRUCTIONS_CONTAINER: ViewStyle = {
  borderColor: color.primary,
  borderWidth: 2,
  marginVertical: spacing[4],
  paddingHorizontal: spacing[4],
  paddingVertical: spacing[4],
}

const BUTTONS_CONTAINER: ViewStyle = {
  flexDirection: "row",
  marginBottom: spacing[1],
  justifyContent: "space-between",
  width: "40%",
}

const BUTTON: ViewStyle = {
  backgroundColor: color.text,
  padding: 0,
  margin: 0,
  width: 32,
  height: 32,
}

const ICON: ImageStyle = {
  width: 32,
  height: 32,
}

const TEXT_DIM: TextStyle = {
  ...TEXT,
  marginBottom: 5,
  color: color.dim,
}

const INSTRUCTION_BODY: TextStyle = {
  textAlign: "justify",
}

const LEVEL_CONTAINER: ViewStyle = {
  ...MAIN_ITEM,
  flexDirection: "column",
}

const LEVEL_TEXT_CONTAINER: ViewStyle = { flexDirection: "row" }

const DIFFICULTY_INDICATOR: ViewStyle = {
  width: "100%",
}

export interface ExerciseDetailItemProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  exercise: Exercise
}

/**
 * Describe your component here
 */
export const ExerciseDetailItem = observer(function ExerciseDetailItem(
  props: ExerciseDetailItemProps,
) {
  const { style } = props
  const styles = flatten([CONTAINER, style])
  const [currentImage, setCurrentImage] = useState(props.exercise.images[0])
  const [animationPlayed, setAnimationPlayed] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [favorites, setFavorites] = useState<Exercise[]>([])
  const [addToWorkout, setAddToWorkout] = useState(false)

  useEffect(() => {
    let interval
    if (animationPlayed) {
      interval = setInterval(() => {
        if (currentImage === props.exercise.images[0]) {
          setCurrentImage(props.exercise.images[1])
        } else if (currentImage === props.exercise.images[1]) {
          setCurrentImage(props.exercise.images[0])
        }
      }, 1000)
      return () => {
        clearInterval(interval)
      }
    } else {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [currentImage, animationPlayed])

  return (
    <View style={styles}>
      <ImageBackground
        style={IMAGE}
        source={{
          uri: `https://raw.githubusercontent.com/seagomezar/Exercises-Compiled-Database/main/images/${currentImage}`,
        }}
      />
      <View style={BUTTONS_CONTAINER}>
        {!animationPlayed ? (
          <Button style={BUTTON} onPress={() => setAnimationPlayed(true)}>
            <Icon icon="play" style={ICON} />
          </Button>
        ) : (
          <Button style={BUTTON} onPress={() => setAnimationPlayed(false)}>
            <Icon icon="pause" style={ICON} />
          </Button>
        )}
        <Button
          style={BUTTON}
          onPress={() => {
            console.log("TBD")
          }}
        >
          <Icon icon="add" style={ICON} />
        </Button>
        <Button
          style={BUTTON}
          onPress={() => {
            console.log("TBD")
          }}
        >
          <Icon icon={"star"} style={ICON} />
        </Button>
      </View>
      <View style={MAIN_ITEM}>
        <Text style={TEXT_DIM} tx="components.exerciseDetailItem.muscle" />
        <Text text={capitalizeFirstLetter(props.exercise.primaryMuscles.join(", "))} />
      </View>

      {props.exercise.secondaryMuscles.length ? (
        <View style={MAIN_ITEM}>
          <Text style={TEXT_DIM} tx="components.exerciseDetailItem.secondaryMuscles" />
          <Text text={capitalizeFirstLetter(props.exercise.secondaryMuscles.join(", "))} />
        </View>
      ) : (
        <></>
      )}

      <View style={LEVEL_CONTAINER}>
        <View style={LEVEL_TEXT_CONTAINER}>
          <Text style={TEXT_DIM} tx="components.exerciseDetailItem.level" />
          <Text text={capitalizeFirstLetter(props.exercise.level)} />
        </View>
        <DifficultyIndicator style={DIFFICULTY_INDICATOR} level={props.exercise.level} />
      </View>

      <View style={DETAILS_CONTAINER}>
        <View style={DETAILS_ITEM}>
          <Text style={TEXT_DIM} tx="components.exerciseDetailItem.kind" />
          <Text text={capitalizeFirstLetter(props.exercise.category)} />
        </View>

        <View style={DETAILS_ITEM}>
          <Text style={TEXT_DIM} tx="components.exerciseDetailItem.force" />
          <Text text={capitalizeFirstLetter(props.exercise.force)} />
        </View>

        <View style={DETAILS_ITEM}>
          <Text style={TEXT_DIM} tx="components.exerciseDetailItem.mechanic" />
          <Text text={capitalizeFirstLetter(props.exercise.mechanic)} />
        </View>

        <View style={DETAILS_ITEM}>
          <Text style={TEXT_DIM} tx="components.exerciseDetailItem.equipment" />
          <Text text={capitalizeFirstLetter(props.exercise.equipment)} />
        </View>
      </View>
      <View style={INSTRUCTIONS_CONTAINER}>
        <Text style={TEXT_DIM} tx="components.exerciseDetailItem.instructions" />
        <Text style={INSTRUCTION_BODY}>
          {capitalizeFirstLetter(props.exercise.instructions.join(" "))}
        </Text>
      </View>
    </View>
  )
})