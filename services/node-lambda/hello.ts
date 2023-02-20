import { v4 } from 'uuid'

async function handler(even: any, context: any) {
  return {
    statusCode: 200,
    body: 'Hello from lambda!!' + v4()
  }
}

export { handler }