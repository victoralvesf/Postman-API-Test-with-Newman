import 'dotenv/config'
import newman from 'newman'
import minimist from 'minimist'
import { onDone, onStart, options } from './config'

const argv = minimist(process.argv.slice(2))

newman
  .run(options(argv.folder))
  .on('start', onStart)
  .on('done', onDone)

