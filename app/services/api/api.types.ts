import { GeneralApiProblem } from "./api-problem"
import { Exercise } from "../../models/exercise/exercise"

export type GetExercisesResult = { kind: "ok"; exercises: Exercise[] } | GeneralApiProblem
