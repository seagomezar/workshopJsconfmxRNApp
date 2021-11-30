# El paso 4

Nuestros ejercicios deben tener su propia página, como te diste cuenta hay demasiada información que en el item de la lista, no hemos podido mostrar. Así que vamos a darle a nuestros ejercicios, cuando le hagan click su propio espacio.

```bash
npx ignite-cli generate screen exercise-detail
```

Esto nos generará nuestra pantalla que a su vez vamos a modificar para que nos muestre el componente exercise-detail-item:

```tsx script
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
```

### Pasando propiedades en la navegación:
En este punto seguro notaste algo raro, estamos pasando el ejercicio como parámetro en la navegación desde nuestro componente:

```tsx script
onPress={()=>{
  navigation.navigate("exerciseDetail", {exercise: props.exercise})
}}
```

Esto es posible ya que la navegación de React Native es super potente y nos permite similarmente a lo que se hace en React Router DOM pasar parametros entre componentes. Pero ahora bien, esto debemos enlazarlo también a nuestro navigator:

```tsx script
...
exerciseDetail: {exercise: Exercise}
...
<Stack.Screen name="exerciseDetail" component={ExerciseDetailScreen} />

```

### Generando el componente ExerciseDetailItem

No te olvides de generar el componente ExerciseDetailItem

```bash script
npx ignite-cli generate component exercise-detail-item
```

Vamos a añadir lo siguiente a nuestro componente de manera que quede bien estilizado:

```tsx script
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
```

Prestale mucha atención al useEffect ya que verás que al hacer click en play una animación con el ejercicio se ejecutará.

Whoot! ¿Eso fue mucho verdad? Y lo peor de todo es que probablemente
no esté funcionando ya que primero vamos a crear un componente más llamado difficulty-indicator para que nos muestre una barra con el nivel de dificultad:

### Creando el componente de indicador de difficultad

```bash
npx ignite-cli generate component difficulty-indicator
```

Y luego vamos a valernos de nuestra creatividad para que refleje
los niveles de difficultad de nuestros ejercicios:

```tsx script
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
```

### Creando una función utilitaria

Luego ya que tenemos nuestro componente de indicador de dificultad
debemos crear una función utilitaria que se compartirá a lo largo de toda la aplicación para poner la primera letra de textos en mayúscula, para ello crea el archivo ./utils/string.ts y coloca la función allí:

```ts script
export function capitalizeFirstLetter(str: string): string {
  if (!str) return ""
  if (str && !str.length) return ""

  return str.charAt(0).toUpperCase() + str.slice(1)
}
```

### Añadiendo las traducciones

Casí estamos listos como siempre mantener un aplicación multilenguaje cuesta un poco más. Pero no te rindas! Solo es añadir algunas traducciones para nuestros componentes:

```json script
"exerciseDetailItem": {
  "muscle": "Músculos: ",
  "kind": "Tipo: ",
  "level": "Nivel: ",
  "force": "Fuerza: ",
  "mechanic": "Mecánica: ",
  "equipment": "Equipo: ",
  "secondaryMuscles": "Músculos Secundarios: ",
  "instructions": "Instrucciones: "
}
```

## Conclusiones

Si todo salió bien deberas poder ver la siguiente pantalla:

![paso4-exercise-detail](https://raw.githubusercontent.com/seagomezar/workshopJsconfmxRNApp/step4/workshop-images/paso4-exercise-detail.png "paso4-exercise-detail")

Tomate tu tiempo. Este paso es largo hemos hecho muchas cosas, creamos varios componentes, una pantalla y la conectamos al flujo de navegación, intenta hacerlo por ti mismo. Sino simplemente pasate a esta rama de git e intentalo!

[IR AL PASO 5 -->](https://github.com/seagomezar/workshopJsconfmxRNApp/tree/step5)