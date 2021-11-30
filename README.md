# El paso 5

He creado un repositorio de github que contiene una lista enorme de ejercicios es una base de datos open source que servirá como fuente inagotable de ejercicios para darle más dinamismo a nuestra aplicación. Por otro lado nos servirá como insumo para dos elementos importantes que aún debemos explorar en el Boilerplate. Estos son los servicios y los modelos:

[Este es el link al repositorio](https://github.com/seagomezar/Exercises-Compiled-Database)

## ¿Qué son los modelos de MobX?
Dentro de este Boilerplate una de las características más avanzadas que trae es el tema de los modelos los modelos son utilizados como capa intermedia entre el almacenamiento, fuente de la verdad o storage, las APIs y las screens. En la siguiente imagen lo verás mejor:

![paso5-models](https://raw.githubusercontent.com/seagomezar/workshopJsconfmxRNApp/step5/workshop-images/paso5-models.png "paso5-models")

Tu!, Como desarrollador tienes el poder para decidir que datos vale la pena guardar y que datos no vale la pena. Pero primero creemos nuestro servicio de ejercicios.

## Utilizando los servicios
Para crear servicios no existe generadores. Esto quiere decir que es el primer archivo que debemos crear de manera manual. Es por esto que vamos a ir a la carpeta ./services/api/ y crearemos nuestro archivos, exercises-api.ts.

Este pasó será simple ya que por defecto el Boilerplate viene un archivo llamado character-api.ts, podemos basar nuestro desarrollo en este archivo. Así que dentro de exercises-api.ts invoquemos nuestro endpoint de ejercicios:

```ts script
import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { GetExercisesResult } from "./api.types"
import { getGeneralApiProblem } from "./api-problem"

const API_PAGE_SIZE = 50

export class ExercisesApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getExercises(): Promise<GetExercisesResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        "https://raw.githubusercontent.com/seagomezar/Exercises-Compiled-Database/main/sample.json",
        { amount: API_PAGE_SIZE },
      )

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const exercises = response.data.exercises

      return { kind: "ok", exercises }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
```

Nota que no hemos usado ni fetch, ni axios. Este Boilerplate viene con una utilidad creada por el equipo mismo de ignite llamado sausage api, que se para sobre axios para ofrecer un par extra de funcionalidades.

### Creando el tipo de la respuesta

Ahora si notaste estamos importando un tipo <GetExercisesResult> que no existe y que debemos de crear dentro de api.types.ts así que vamos a crearlo.

Añadamos una linea al final con nuestro tipo genérico:

```ts
export type GetExercisesResult = { kind: "ok"; exercises: [] } | GeneralApiProblem
```

Vamos a usar el tipo Exercise que creamos en nuestra screen.
Para ellos Mobx Ofrece una funcionalidad que permite convertir Modelos de MobX en Interfaces de Typescript.

Es tiempo de crear nuestro modelo

## Creando el modelo ejercicio y ejercicio store

Vamos a usar el ignite-cli para crear nuestro modelo. Vamos a tener dos modelos. El primero representará el ejercicio en su versión pura:

```bash
npx ignite-cli generate model exercise
```

Y lo vamos a llenar basandonos en la interface de typescript que habiamos creado en nuestra screen:

```ts script
import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const ExerciseModel = types
  .model("Exercise")
  .props({
    name: types.optional(types.string,""),
    force: types.optional(types.maybeNull(types.string), ""),
    level: types.optional(types.maybeNull(types.string), ""),
    mechanic: types.optional(types.maybeNull(types.string), ""),
    equipment: types.optional(types.maybeNull(types.string), ""),
    primaryMuscles: types.optional(types.array(types.string), []),
    secondaryMuscles: types.optional(types.array(types.string), []),
    instructions: types.optional(types.array(types.string), []),
    category: types.optional(types.maybeNull(types.string), ""),
    images: types.optional(types.array(types.string), []),
    id: types.string
  })

type ExerciseType = Instance<typeof ExerciseModel>
export interface Exercise extends ExerciseType {}
type ExerciseSnapshotType = SnapshotOut<typeof ExerciseModel>
export interface ExerciseSnapshot extends ExerciseSnapshotType {}
export const createExerciseDefaultModel = () => types.optional(ExerciseModel, {})
```

Luego vamos a generar el exercises-store que será el modelo encargado de llamar a la API de ejercicios y porque no guardarlos, si es el caso en nuestro manejador de estados si queremos manejar algún sistema de cache. Por ahora esto es lo que debería contener tu exercise-store:

```ts script
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"
import { ExerciseModel, ExerciseSnapshot } from "../exercise/exercise"
import { ExercisesApi } from "../../services/api/exercises-api"

export const ExerciseStoreModel = types
  .model("ExerciseStore")
  .props({
    exercises: types.optional(types.array(ExerciseModel), []),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveExercises: (exerciseSnapshots: ExerciseSnapshot[]) => {
      self.exercises.replace(exerciseSnapshots)
    },
  }))
  .actions((self) => ({
    getExercises: async () => {
      const exerciseApi = new ExercisesApi(self.environment.api)
      const result = await exerciseApi.getExercises()

      if (result.kind === "ok") {
        // Thing very well why you want to store something
        // self.saveExercises(result.exercises)
        // instead of simply returning
        return result.exercises
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
  }))

type ExerciseStoreType = Instance<typeof ExerciseStoreModel>
export interface ExerciseStore extends ExerciseStoreType { }
type ExerciseStoreSnapshotType = SnapshotOut<typeof ExerciseStoreModel>
export interface ExerciseStoreSnapshot extends ExerciseStoreSnapshotType { }
export const createExerciseStoreDefaultModel = () => types.optional(ExerciseStoreModel, {})
```

El siguiente paso es colocar la nueva store disponible para toda la aplicación. Esto se hace en root-store.ts:

```ts script
import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ExerciseStoreModel } from "../exercise-store/exercise-store"
import { CharacterStoreModel } from "../character-store/character-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  characterStore: types.optional(CharacterStoreModel, {} as any),
  exerciseStore: types.optional(ExerciseStoreModel, {} as any)
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}

```

Y finalmente vamos decirle a nuestra exercises screen que por favor a través del modelo vaya y llame la API y nos retorne los resultados:

```tsx script
...
const nextScreen = () => navigation.navigate("demo")
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

return ...
```

recuerda por ultimo actualizar el tipo de dato de la respuesta en el api.types.ts:

```ts script
export type GetExercisesResult = { kind: "ok"; exercises: Exercise[] } | GeneralApiProblem
```

Notarás que de inmediato cargan cientos de ejercicios en nuestra exercise screen. Estamos trayendo muchos ejercicio y podemos casi que automáticamente ver el detalle de cada ejercicio.

## Conclusiones

Si todo salió bien deberas poder ver la siguiente pantalla:

![paso5-todos-los-ejercicios.png](https://raw.githubusercontent.com/seagomezar/workshopJsconfmxRNApp/step5/paso5-todos-los-ejercicios.png "paso5-todos-los-ejercicios")

Entender los Modelos, las APIs y como conectarlos y usarlos correctamente toma tiempo pero trae grandes beneficios de escalabilidad a largo plazo

[IR AL PASO 6 -->](https://github.com/seagomezar/workshopJsconfmxRNApp/tree/step6)