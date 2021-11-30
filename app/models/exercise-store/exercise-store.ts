import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ExerciseModel, ExerciseSnapshot } from "../exercise/exercise"
import { ExercisesApi } from "../../services/api/exercises-api"
import { withEnvironment } from "../extensions/with-environment"

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
        return result.exercises
      } else {
        __DEV__ && console.tron.log(result.kind)
      }
    },
  }))

type ExerciseStoreType = Instance<typeof ExerciseStoreModel>
export interface ExerciseStore extends ExerciseStoreType {}
type ExerciseStoreSnapshotType = SnapshotOut<typeof ExerciseStoreModel>
export interface ExerciseStoreSnapshot extends ExerciseStoreSnapshotType {}
export const createExerciseStoreDefaultModel = () => types.optional(ExerciseStoreModel, {})
