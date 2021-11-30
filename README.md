# Paso 3 - Usando el Ignite-cli para generar Componentes 🔥

## Usando el Ignite Cli Generator
Igualmente que como hicimos en el paso anterior vamos a generar nuestro primer componente, ya te imaginarás que el boilerplate te ayuda no solo a generar screens sino también componentes! Y como te dije el objetivo de la pagina de ejercicios o "exercises screen" se encargará de mostrar una lista de ejercicios para que el usuario pueda libremente buscar, ver y reproducir ejercicios para si entrenamiento en el Gimnasio. 🏋🏻‍♀️ 💪.

## Creación de los componentes

Toda lista debe estar compuesta al menos de dos componentes, el primero es un componente contenedor que debe tener el componente más popular y utilizado de React Native las flatlists y luego un componente que se encarga de renderizar el item de la lista en si mismo, entonces vamos a generar dos componentes:

```bash
npx ignite-cli generate component exercise-list-container
npx ignite-cli generate component exercise-list-item
```

## Creando nuestro componente contenedor

Vamos a insertar en nuestra pantalla el componente exercise-list-container y vamos a enviarle un arreglo de ejercicios, por ahora vamos a hardcodear un par de ejercicios en esta pantalla y vamos a escribirle un par de ellos y a enviarlo por props, primero definamos el ejercicio, que atributos tendrá:

```ts script
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
```

Luego creemos un par de ejercicios:

```ts script
const exercises: Exercise[] = [
{
  "name": "3/4 Sit-Up",
  "force": "pull",
  "level": "beginner",
  "mechanic": "compound",
  "equipment": "body only",
  "primaryMuscles": [
    "abdominals"
  ],
  "secondaryMuscles": [],
  "instructions": [
    "Lie down on the floor and secure your feet. Your legs should be bent at the knees.",
    "Place your hands behind or to the side of your head. You will begin with your back on the ground. This will be your starting position.",
    "Flex your hips and spine to raise your torso toward your knees.",
    "At the top of the contraction your torso should be perpendicular to the ground. Reverse the motion, going only Â¾ of the way down.",
    "Repeat for the recommended amount of repetitions."
  ],
  "category": "strength",
  "images": [
    "3_4_Sit-Up_1.jpg",
    "3_4_Sit-Up_2.jpg"
  ],
  "id": "3_4_Sit-Up"
},
{
  "name": "90/90 Hamstring",
  "force": "push",
  "level": "beginner",
  "mechanic": null,
  "equipment": "body only",
  "primaryMuscles": [
    "hamstrings"
  ],
  "secondaryMuscles": [
    "calves"
  ],
  "instructions": [
    "Lie on your back, with one leg extended straight out.",
    "With the other leg, bend the hip and knee to 90 degrees. You may brace your leg with your hands if necessary. This will be your starting position.",
    "Extend your leg straight into the air, pausing briefly at the top. Return the leg to the starting position.",
    "Repeat for 10-20 repetitions, and then switch to the other leg."
  ],
  "category": "stretching",
  "images": [
    "90_90_Hamstring_1.jpg",
    "90_90_Hamstring_2.jpg"
  ],
  "id": "90_90_Hamstring"
}
]
```

y Luego desde nuestra exercises screen coloquemos el componente de exercise-list-container:

```tsx script
...
<Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
  <Header
    headerTx="exercisesScreen.title"
    style={HEADER}
    leftIcon="back"
    onLeftPress={()=>{
      navigation.goBack()
    }}
    titleStyle={HEADER_TITLE}
  />
  <ExerciseListContainer exercises={exercises} />
</Screen>
...
```

Algo importante de notar es que en vez que esta pantalla sea una
pantalla de tipo scroll **preset="scroll"** será fija **preset="fixed", ya que lo que queremos es que lo único scrolleable sea nuestra lista de ejercicios.

Ahora vamos a nuestro componente exercise-list-container, indiquemosle que va a recibir un arreglo de ejercicios y coloquemos una flat list para mostrar nuestros dos ejercicios:


```tsx script
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

export const ExerciseListContainer = observer(function ExerciseListContainer(props: ExerciseListContainerProps) {
  const { style } = props
  const styles = flatten([CONTAINER, style])

  return (
    <View style={styles}>
      <FlatList
        data={props.exercises}
        keyExtractor={(item)=>item.id}
        renderItem={({item})=><ExerciseListItem exercise={item}/>}
      />
    </View>
  )
})
```

Verás que inmediatamente nuestra lista renderiza dos items que dicen Hello, pero que en realidad en unos instantes serán dos ejercicios:

![paso3-two-items-flatlist](https://raw.githubusercontent.com/seagomezar/workshopJsconfmxRNApp/step3/workshop-images/paso3-two-items-flatlist.png "paso3-two-items-flatlist")

## Creando nuestro componente de list item

Ahora lo que queremos es que se vean los ejercicios correctamente,
para ello vamos a modificar el componente exercise-list-item para que luzca de la siguiente manera:

```tsx script
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
```

No te olvides de las traducciones:

```json script
"components": {
  "exerciseListItem": {
    "muscle": "Músculo: ",
    "kind": "Tipo: "
  }
}
```

Si todo salió bien deberas poder ver la siguiente pantalla:

![paso3-exercise-list-item](https://raw.githubusercontent.com/seagomezar/workshopJsconfmxRNApp/step3/workshop-images/paso3-exercise-list-item.png "paso3-exercise-list-item")

Es tu momento ve y juega un poco más con el componente, quisieras añadirle algo?

¿Como lo hárias? Deja volar tu imaginación!


## Conclusiones 📚

😉 Ha sido divertido! Por ahora te dejo el enlace al siguiente paso:

### [IR AL PASO 4](https://github.com/seagomezar/workshopJsconfmxRNApp/tree/step4)
