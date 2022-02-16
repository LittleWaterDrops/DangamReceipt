const currentEnv: NodeJS.ProcessEnv = process.env

const SERVER_HOST = currentEnv.REACT_APP_SERVER_HOST
const SERVER_PORT = currentEnv.REACT_APP_SERVER_PORT

const SERVER_CONFIG = {
  URL: `http://${SERVER_HOST}:${SERVER_PORT}`,
  HOST: SERVER_HOST,
  PORT: SERVER_PORT,
}

export default SERVER_CONFIG
