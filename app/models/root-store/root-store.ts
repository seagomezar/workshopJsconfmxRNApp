import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { ExerciseStoreModel } from "../exercise-store/exercise-store"
/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
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
