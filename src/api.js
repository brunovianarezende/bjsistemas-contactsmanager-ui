let apiSingleton = null

export const setApi = (api) => {
  apiSingleton = api
}

export const getApi = () => {
  return apiSingleton
}

class TempApi {
  deleteContact (id) {
    return Promise.resolve(true)
  }
}

export const buildApi = () => {
  return new TempApi()
}
