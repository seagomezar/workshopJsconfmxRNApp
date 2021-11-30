import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Model description here for TypeScript hints.
 */
export const ExerciseModel = types.model("Exercise").props({
  name: types.optional(types.string, ""),
  force: types.optional(types.maybeNull(types.string), ""),
  level: types.optional(types.maybeNull(types.string), ""),
  mechanic: types.optional(types.maybeNull(types.string), ""),
  equipment: types.optional(types.maybeNull(types.string), ""),
  primaryMuscles: types.optional(types.array(types.string), []),
  secondaryMuscles: types.optional(types.array(types.string), []),
  instructions: types.optional(types.array(types.string), []),
  category: types.optional(types.maybeNull(types.string), ""),
  images: types.optional(types.array(types.string), []),
  id: types.optional(types.string, ""),
})

type ExerciseType = Instance<typeof ExerciseModel>
export interface Exercise extends ExerciseType {}
type ExerciseSnapshotType = SnapshotOut<typeof ExerciseModel>
export interface ExerciseSnapshot extends ExerciseSnapshotType {}
export const createExerciseDefaultModel = () => types.optional(ExerciseModel, {})
