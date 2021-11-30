# Paso 6 - La limpieza definitiva 🧹

Bien! No te has rendido hemos llegado al paso 6 para poder hacer que tu aplicación este lista es necesario que limpiemos los elementos innecesarios de nuestra aplicación.

Vamos a borrar las pantallas que no necesitamos, los modelos y las APIs, así también removeremos las traducciones que tampoco necesitamos y tendremos una app, y un entorno de desarrollo mucho más limpio.

## Borrando las pantallas que no usamos 🧹

- Empecemos borrando la demo screen! (No te olvides de actualizar) las rutas y screens.

- Remueve el boton de continuar en el exercise screen

## Borrando los modelos que no usamos 🧹

- Remueve el character y el character store (No te olvides de desvincularlo desde el rootstore)

## Borrando las APIs que no usamos 🧹

- Borra la character API y borra los metodos de la API de usuarios de api.ts

## Organizando las traducciones 🇲🇽

- Setea por defecto el lenguaje a español y borra el archivo de japones
- Asegurate que no estas omitiendo ninguna traducción

## Ejecuta los testfinales y formatea todo tu codigo

```bash
yarn test
```

```bash
yarn lint
```

Deberás modificar algunos textos en algunos archivos de storybook pero nada que no entiendas en este momento.

## Conclusiones 📚

Tu aplicación debe de estar funcionando bastante bien, ya no tienes archivos innecesarios y todo parece estar optimizado para que puedas
pasar tu aplicación a producción

## [IR AL PASO 7](https://github.com/seagomezar/workshopJsconfmxRNApp/tree/step6)
