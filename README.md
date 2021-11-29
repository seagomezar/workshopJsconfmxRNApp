# El paso 2

Como te diste cuenta hay muchas funcionalidades chéveres que vienen con este Boilerplate en este segundo paso te voy a enseñar a usar el generador que viene integrado junto con el Boilerplate.

## Usando el Ignite Cli Generator

¿Qué harías si tuvieras que crear una pantalla similar a la "welcome screen"? ¿Como empezarías? ¿Duplicarías la carpeta? copiarías todo el código?, Bien! todas las respuestas son correctas tendríamos que hacer mucho trabajo con grandes probablididades de equivocarnos. Es por esto que el boilerplate viene con su generador de Screens, Components y Navigators y Models, sí todo eso junto disponible con un solo comando.

Lo único que debes hacer es invocar al generador para que te ayude con eso:

```bash
npx ignite-cli generate screen exercises
```

Así es vamos a generar una nueva pantalla llamada exercises donde vamos a mostrar (más adelante una lista de ejercicios, seremos muy fitness en esta aplicación).

Si el comando te funcionó bien deberás tener en tu consola algo como esto:

```bash
Generated new files:
 ../workshopJsconfmxRNApp/app/screens/exercises/exercises-screen.tsx
```

Esta pantalla estará vacía y no podemos navegar a ella, ¿Como se verá entonces?

Queremos pasar de este flujo (flujo actual):
![paso2-flow](https://raw.githubusercontent.com/seagomezar/workshopJsconfmxRNApp/step2/workshop-images/paso2-flow.png "paso2-flow")

A este nuevo Flujo:

![paso2-flow1](https://raw.githubusercontent.com/seagomezar/workshopJsconfmxRNApp/step2/workshop-images/paso2-flow1.png "paso2-flow1")

## Conectando tu pantalla al navegador

Lo primero que debes hacer es añadir la pantalla creada al navegador. Esto es fácil solo modifica el /navigators/app-navigator.tsx para que la incluya:

```ts script
/** ... */
import { WelcomeScreen, DemoScreen, DemoListScreen, ExercisesScreen } from "../screens"
/** ... */
export type NavigatorParamList = {
  welcome: undefined
  demo: undefined
  demoList: undefined
  exercises: undefined
}
/** ... */
<Stack.Screen name="demoList" component={DemoListScreen} />
<Stack.Screen name="exercises" component={ExercisesScreen} />
/** ... */
```

Ahora en nuestra Welcome Screen necesitamos que al hacer click en continuar seamos redirigidos a la pantalla de exercises, simplemente vamos a modificar el metodo nextScreen:

```ts script
const nextScreen = () => navigation.navigate("exercises")
```

Y finalmente escribamos en nuestra pantalla un botón para continuar a la demo screen y otro para regresar a la welcome screen.

Así debería quedar tu Exercises Screen:

```tsx script
import React, { FC } from "react"
import { View, ViewStyle, TextStyle, SafeAreaView } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Button,
  Header,
  Screen,
  GradientBackground,
} from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"

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

const CONTINUE: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.palette.deepPurple,
}
const CONTINUE_TEXT: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
}
const FOOTER: ViewStyle = { backgroundColor: "#20162D" }
const FOOTER_CONTENT: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
}

export const ExercisesScreen: FC<StackScreenProps<NavigatorParamList, "exercises">> = observer(
  ({ navigation }) => {
    const nextScreen = () => navigation.navigate("demo")

    return (
      <View testID="ExercisesScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
          <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
            <Header
              headerTx="exercisesScreen.title"
              style={HEADER}
              leftIcon="back"
              onLeftPress={()=>{
                navigation.goBack()
              }}
              titleStyle={HEADER_TITLE}
            />
          </Screen>
          <SafeAreaView style={FOOTER}>
            <View style={FOOTER_CONTENT}>
              <Button
                testID="next-screen-button"
                style={CONTINUE}
                textStyle={CONTINUE_TEXT}
                tx="welcomeScreen.continue"
                onPress={nextScreen}
              />
            </View>
          </SafeAreaView>
      </View>
    )
  },
)

```

Como te darás cuenta hemos casí que duplicado algunas de las funcionalidades de nuestra WelcomeScreen y hemos utilizado el componente header para añadir el título y la posibilidad de navegar hacia atrás.

## Conclusiones

Deberás tener una pantalla similar a esta al finalizar este paso..

![paso2-exercises-screen](https://raw.githubusercontent.com/seagomezar/workshopJsconfmxRNApp/step2/workshop-images/paso2-exercises-screen.png "paso2-exercises-screen"

Espera! ¿No es así? Seguro es porque te hace falta añadir las traducciones en inglés y en español para tu pantalla, algó así!

```ts script
"exercisesScreen": {
  "title": "Exercises"
},
```

😉 Espero hayas podido detectar el error, sino es así no te preocupes
poco a poco iremos aprendiendo, por ahora te dejo el enlace al siguiente paso:

[IR AL PASO 3 -->](https://github.com/seagomezar/workshopJsconfmxRNApp/tree/step3)