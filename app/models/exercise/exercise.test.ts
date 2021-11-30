import { ExerciseModel } from "./exercise"

test("can be created", () => {
  const instance = ExerciseModel.create({})

  expect(instance).toBeTruthy()
})
