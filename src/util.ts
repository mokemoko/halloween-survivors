export const logger = {
  log (...arg) {
    console.table(...arg)
  }
}

export async function sleep (ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
