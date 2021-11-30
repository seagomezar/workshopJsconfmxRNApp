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
