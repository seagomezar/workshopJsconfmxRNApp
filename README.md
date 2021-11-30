# El paso 7

Estamos listos para ir a producción, simplemente debemos configurar nuestra splash screen y nuestro icono. Encontrarás los que tiene la aplicación por defecto en ./assets/images yo los he reemplazado por este par de archivos reespectivamente:

- Icono:
![Icono](https://raw.githubusercontent.com/seagomezar/workshopJsconfmxRNApp/step7/assets/images/icon.png "Icono")

- Icono:
![splash](https://raw.githubusercontent.com/seagomezar/workshopJsconfmxRNApp/step7/assets/images/splash.png "splash")


Luego debes configurar expo el paquete y demás en app.json:

```json script
{
  "expo": {
    "name": "workshopJsconfmxRNApp",
    "slug": "workshopJsconfmxRNApp",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.jsconfmx.fitnessapp",
      "buildNumber": "1.0.0"
    },
    "android": {
      "package": "com.jsconfmx.fitnessapp",
      "versionCode": 1
    },
    "web": {
      "favicon": "./assets/images/favicon.png"
    }
  }
}

```

Eso es todo simplemente debes ejecutar el comando:

```bash
expo build:android
```

o para iOS

```bash
expo build:ios
```

Donde te pedirá que crees o tengas una cuenta en expo, y bingo! Estas listo para hacer deploy de tu aplicación a las tiendas.

Puedes monitorear el estatus de tu APK en:

![paso7-expodashboard](https://raw.githubusercontent.com/seagomezar/workshopJsconfmxRNApp/step7/workshop-images/paso7-expodashboard.png "paso7-expodashboard")

## Conclusiones

Hemos llegado al fin!, espero que hayas disfrutado este workshop tanto como yo! Aprendiste como desarrollar siguiendo buenas prácticas una aplicación que cumple en gran medida los parámetros de escalabilidad, mantenibilidad y con una experiencia de desarrollo exelente.

Eso es todo, Mil gracias

- [Te dejo mi sitio web](https://sebastian-gomez.com)
- [Te dejo mi canal de YouTube](https://www.youtube.com/watch?v=wNXUk00s5F4&t=70s)
- [Te dejo mi twitter](https://twitter.com/sebasgojs)

Y hasta la próxima.
