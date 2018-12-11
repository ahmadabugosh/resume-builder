/**
 * @flow
 */

import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import helmet from 'koa-helmet'
import Router from 'koa-router';

import router from './routes'
import renderFile from '../renderFile'

import { errorHandler } from './middleware'
import serve from 'koa-static';
const app = new Koa()
const routers = new Router();

if (app.env === 'development') {
  app.proxy = true
}


app.use(serve(__dirname + '/../../client/'));
app.use(serve(__dirname + '/../../client/dist/'));



app.use(errorHandler())
app.use(helmet())
app.use(bodyParser())

app.use(router)

routers
  .get('*', async (ctx) => {
    ctx.body = await renderFile(__dirname + '/../../client/dist/index.html')
  })

app.use(routers.routes());

export default app
