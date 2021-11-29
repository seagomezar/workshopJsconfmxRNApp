## El paso 1

Si todo andó bien, estarás ansioso por empezar, lo primero de lo primero que te quiero enseñar es a hacer tu app multilenguaje, Si! Leíste bien, **multilenguaje** esa funcionalidad tremendamente grande y difícil que alguna vez tendrás que hacer en algún proyecto, y te darás cuenta que no es sencillo.

Sin embargo te cuento que con el Ignite Boilerplate (este boilerplate) esta funcionalidad ya viene resuelta y completamente lista para ser utilizada e implementada de una manera fácil.

### Encuentra los archivos de traducción

Normalmente estos archivos se encuentra en ./app/i18n/
allí verás que por defecto vienen dos archivos: en.json y ja.json
que hacen referencia a inglés y japones. Como personalmente yo no sé japones prefiero que trabajemos en inglés y español. ¿Te parece?

### Substituye o crea el archivo es.json

Renombra el archivo ja.json por **es.json** o si en un futuro quieres
hacer las traducciones al japones simplemente déjalo y crea uno nuevo
**es.json**

### Crea un par de traducciones clave valor

Vamos crear un par de traducciones te invito a que copies y pegues el siguiente código dentro del archivo es.json:

```ts script
{
  "welcomeScreen": {
    "poweredBy": "Patrocinado por la JSCONFMX",
    "readyForLaunch": "Estamos listos para desplegar",
    "continue": "Continuar",
    "lang": "I speak english 🇺🇸"
  }
}
```

Ahora en el archivo en.json añadé dentro de la welcome screen una
línea que permita en caso de que tu usuario no hable inglés pueda entender que debe cambiar la aplicación a español:

```ts script
{
  "welcomeScreen": {
    "poweredBy": "Patrocinado por la JSCONFMX",
    "readyForLaunch": "Estamos listos para desplegar",
    "continue": "Continuar",
    "lang": "I speak english 🇺🇸" /** <--- AQUI */
  }
}
```

### Cambiemos el contenido inicial de la welcome screen

Ya has creado algunas traducciones para la welcomeScreen, así que
porque no vamos a la ./app/screens/welcome/welcome-screen.tsx y reemplazamos el contenido por algo que este disponible en inglés y en español, nota que he añadido el logo de la jsconfmx en .png así que asegurate de tenerlo dentro de tu carpeta ./app/screens/welcome
para ser utilizado. [Aquí está el enlace](https://github.com/seagomezar/workshopJsconfmxRNApp/tree/main/app/screens/welcome):

```ts script
import React, { FC, useState } from "react"
import { View, ViewStyle, TextStyle, ImageStyle, SafeAreaView } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import {
  Button,
  Header,
  Screen,
  Text,
  GradientBackground,
  AutoImage as Image,
} from "../../components"
import { color, spacing, typography } from "../../theme"
import { NavigatorParamList } from "../../navigators"
import I18n from "i18n-js"

const jsconfLogo = require("./jsconfmx.png") // <-- ASEGURATE DE QUE ESTE

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

const TITLE: TextStyle = {
  ...TEXT,
  ...BOLD,
  fontSize: 28,
  lineHeight: 38,
  textAlign: "center",
}

const JSCONFLOGO: ImageStyle = {
  alignSelf: "center",
  marginVertical: spacing[5],
  maxWidth: "100%",
  width: 200,
  height: 200,
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

export const WelcomeScreen: FC<StackScreenProps<NavigatorParamList, "welcome">> = observer(
  ({ navigation }) => {
    const nextScreen = () => navigation.navigate("demo")
    const [reload, setReload] = useState(false)
    const changeLanguage = () => {
      if (I18n.locale === "es-MX") {
        I18n.locale = "en-UX"
      } else {
        I18n.locale = "es-MX"
      }
      setReload(true)
      setTimeout(() => {
        setReload(false)
      }, 0)
    }
    return (
      <View testID="WelcomeScreen" style={FULL}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        {(!reload) ? <>
          <Screen style={CONTAINER} preset="scroll" backgroundColor={color.transparent}>
            <Header headerTx="welcomeScreen.poweredBy" style={HEADER} titleStyle={HEADER_TITLE} />
            <Text style={TITLE} preset="header" tx="welcomeScreen.readyForLaunch" />
            <Image source={jsconfLogo} style={JSCONFLOGO} />
            <Button tx="welcomeScreen.lang" onPress={changeLanguage} />
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
        </> : <></>}
      </View>
    )
  },
)
```

También debemos modificar el archivo ./app/i18n.ts para añadir nuestro nuevo idioma:

```ts script
import en from "./en.json"
import ja from "./ja.json"
import es from "./es.json"

i18n.fallbacks = true
i18n.translations = { en, ja, es }

i18n.locale = Localization.locale || "en"
```

## Conclusiones

Cambiar el lenguaje de tu aplicación resulta bastante sencillo y te permite manejar múltiples idiomas de manera simple e intuitiva. Sin embargo nota que tuvimos que re-renderizar nuestra screen para ver los cambios inmediatamente, de lo contrario solo hasta que por algún motivo se recargue nuestra pantalla es que podríamos ver las nuevas traducciones.