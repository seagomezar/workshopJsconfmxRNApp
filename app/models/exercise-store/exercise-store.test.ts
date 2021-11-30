import { ExerciseStoreModel } from "./exercise-store"

test("can be created", () => {
  const instance = ExerciseStoreModel.create({})

  expect(instance).toBeTruthy()
})
