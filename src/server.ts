import 'isomorphic-fetch'
import dotenv from 'dotenv'
import Koa from 'koa'
import next from 'next'
import createShopifyAuth, { verifyRequest } from '@shopify/koa-shopify-auth'
import session from 'koa-session'

dotenv.config()
import graphQLProxy, { ApiVersion } from '@shopify/koa-shopify-graphql-proxy'

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const { SHOPIFY_API_SECRET_KEY, SHOPIFY_API_KEY } = process.env

app.prepare().then(() => {
  console.log('port: ', port)
  const server = new Koa()
  server.use(session({ secure: true, sameSite: 'none' }, server))
  server.keys = [SHOPIFY_API_SECRET_KEY]
  server.use(
    createShopifyAuth({
      apiKey: SHOPIFY_API_KEY,
      secret: SHOPIFY_API_SECRET_KEY,
      scopes: ['read_products', 'write_products'],
      afterAuth(ctx) {
        const urlParams = new URLSearchParams(ctx.request.url)
        const shop = urlParams.get('shop')

        ctx.redirect(`/?shop=${shop}`)
      }
    })
  )

  server.use(graphQLProxy({ version: ApiVersion.October19 }))
  server.use(verifyRequest())
  server.use(async (ctx) => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
    ctx.res.statusCode = 200
    return
  })
  // console.log('port: ', port)
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})
