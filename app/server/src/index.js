/**
 * @flow
 */

import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import helmet from 'koa-helmet'
import Router from 'koa-router';

import routes from './routes'
import renderFile from '../renderFile'

import { errorHandler } from './middleware'
import serve from 'koa-static';
const app = new Koa()
const router = new Router();

if (app.env === 'development') {
  app.proxy = true
}


app.use(serve(__dirname + '/../../client/'));
app.use(serve(__dirname + '/../../client/dist/'));



app.use(errorHandler())
app.use(helmet())
app.use(bodyParser())

router
  .get('*', async (ctx) => {
    ctx.body = await renderFile(__dirname + '/../../client/dist/index.html')
  })

app.use(routes)
app.use(router.routes());

export default app
