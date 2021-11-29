
# Bienvenido al workshop "Construye tu aplicación de React Native en 30 minutos" 🥳



Hola! Soy Sebastian Gomez @sebasgojs en twitter y trabajo en una

empresa llamada Globant como Manager de Tecnología con enfoque en

aplicaciones híbridas y cross compiladas! 🙃.



Espero que nos divirtamos mucho en este Workshop y te lleves la idea de buenas prácticas y como crear un base para tus proyectos de React Native.



## ¿De qué se trata este workshop?



Bien, Mi objetivo no es otro que te familiarices con el Ignite-cli

y el boilerplate más utilizado para desarrollar desde cero aplicaciones de react native pero, con buenas prácticas y con la

mejor experiencia de desarrollo que conozco para desarrollar con

React Native.



##¿Qué debo tener instalado?



Bien es una gran pregunta! Inicialmente debes tener instalado la versión LTS NodeJS y en segundo lugar debes tener instalado Expo Go en tu celular Android🤖 o iOS📱. (Whaaat?) Tranquilo, aquí te dejo los enlaces:



- [NodeJs](https://nodejs.org/es/)

- [Expo Go](https://expo.dev/client)



## ¿De quien es este Boilerplate?



Este es un Boilerplate que utiliza [Infinite Red](https://infinite.red) para desarrollar todos sus proyectos de React Native, entre sus miembros se encuentran incluso integrantes del core de React Native, así que vale la pena entenderlo a profundidad.



Aquí te dejo el enlace a la documentación oficial del proyecto:

[Ignite Boilerplate](https://github.com/infinitered/ignite)



Y aquí te dejo un enlace a mi canal de YouTube donde explico

en que consiste y el objetivo del mismo:



[Link a mi canal de YouTube](https://www.youtube.com/watch?v=wNXUk00s5F4&t=70s)



Este Boilerplate Incluye:



- React Native

- React Navigation

- MobX State Tree

- TypeScript

- And more!



## Estructura de las carpetas



El Ignite boilerplate tiene una estructura similar a esta:



```

ignite-project

├── app

│ ├── components

│ ├── i18n

│ ├── utils

│ ├── models

│ ├── navigators

│ ├── screens

│ ├── services

│ ├── theme

│ ├── app.tsx

├── storybook

│ ├── views

│ ├── index.ts

│ ├── storybook-registry.ts

│ ├── storybook.ts

│ ├── toggle-storybook.tsx

├── test

│ ├── __snapshots__

│ ├── storyshots.test.ts.snap

│ ├── mock-i18n.ts

│ ├── mock-reactotron.ts

│ ├── setup.ts

│ ├── storyshots.test.ts

├── README.md

├── android

│ ├── app

│ ├── build.gradle

│ ├── gradle

│ ├── gradle.properties

│ ├── gradlew

│ ├── gradlew.bat

│ ├── keystores

│ └── settings.gradle

├── ignite

│ ├── ignite.json

│ └── plugins

├── index.js

├── ios

│ ├── IgniteProject

│ ├── IgniteProject-tvOS

│ ├── IgniteProject-tvOSTests

│ ├── IgniteProject.xcodeproj

│ └── IgniteProjectTests

├── .env

└── package.json



```



### El directorio ./app



Este es directorio que manualmente crearías si usaras create-react-native-app o si simplemente empezaras desde cero



```

app

│── components

│── i18n

├── models

├── navigators

├── screens

├── services

├── theme

├── utils

└── app.tsx

```



## Primer paso



Bien, te he dado un vistazo general de que va esto y porque se usa,

básicamente estamos copiando las mejoras prácticas de los mejores sobre como usar React Native, ¿Estas listo para empezar?:



Tienes dos opciones:



- La primera es crear la aplicación usando el ignite cli, sería algo como así:



    npx ignite-cli new nombredetuproyecto --expo --bundle=com.tupaquete.tuproyecto



Inmediatamente verías un mensaje en tu terminal como esta:



![paso1-terminal](https://raw.githubusercontent.com/seagomezar/workshopJsconfmxRNApp/main/workshop-images/paso1-terminal.png "paso1-terminal")



- El comando que usé para crear este repo fue este:


    npx ignite-cli new workshopJsconfmxRNApp --expo --bundle=com.jsconfmx.fitnessapp


Aquí algunas consideraciones: He notado que este proceso en algunos

computadores puede tardar mucho tiempo, alrededor de 15 a 20 minutos

así que si quieres evitar esta espera clona directamente este repo y luego ejecuta el comando:



    yarn



Esto instalará todo y tendrás la aplicación más rapido y totalmente funcional. Ahora bien es tu turno ¿Que quieres hacer? y te veo en el paso 2.



### ¿Como sabrás que todo quedó bien?



Debes ejecutar dentro del proyecto yarn start y deberás ver una pantalla similar a esta en tu navegador:



![paso1-browser-expo](https://raw.githubusercontent.com/seagomezar/workshopJsconfmxRNApp/main/workshop-images/paso1-browser-expo.png "paso1-browser-expo")



y finalmente si ya tienes instalado Expo Go en tu celular, escanea el código QR y esto es lo que deberías luego de un rato ver:



![paso1-welcome-screen](https://raw.githubusercontent.com/seagomezar/workshopJsconfmxRNApp/main/workshop-images/paso1-welcome-screen.png "paso1-welcome-screen")



![paso1-demo-screen](https://raw.githubusercontent.com/seagomezar/workshopJsconfmxRNApp/main/workshop-images/paso1-demo-screen.png "paso1-demo-screen")



![paso1-demolist-screen](https://raw.githubusercontent.com/seagomezar/workshopJsconfmxRNApp/main/workshop-images/paso1-demolist-screen.png "paso1-demolist-screen")



[IR AL PASO 1 -->](https://github.com/seagomezar/workshopJsconfmxRNApp/tree/step1)