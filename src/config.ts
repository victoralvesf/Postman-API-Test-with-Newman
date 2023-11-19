import { NewmanRunOptions } from 'newman'
import { join } from 'path'

const apiKey = process.env.APIKEY || ''

const collection = join(__dirname, 'collections', 'hunter.io.postman_collection.json')
const environment = join(__dirname, 'environments', 'prod.postman_environment.json')
const iterationData = (name: string) => join(__dirname, 'data', `${name}.csv`)

const htmlExtraOptions = (folder: string) => ({
  export: `../reports/report_${folder}.html`,
  browserTitle: 'Newman HTML Report',
  title: `Hunter.io API Tests - ${folder}`,
  omitHeaders: false,
  skipHeaders: 'X-API-KEY',
  omitRequestBodies: false,
  omitResponseBodies: false,
  skipEnvironmentVars: ['apikey'],
  skipSensitiveData: false,
  showFolderDescription: true,
  timezone: 'America/Sao_Paulo'
})

export const options = (folder: string): NewmanRunOptions => ({
  collection,
  environment,
  iterationData: iterationData(folder),
  folder,
  reporters: [
    'cli',
    'htmlextra'
  ],
  reporter: {
    htmlextra: htmlExtraOptions(folder)
  },
  envVar: [
    { key: 'apikey', value: apiKey }
  ]
})

export const onStart = () => { console.log('Starting postman collection run') }
export const onDone = (err: any, summary: any) => {
  if (err || summary.error) {
    console.error('\nPostman collection encountered error')
    return
  }

  console.log('\nPostman collection ran successfully')
}