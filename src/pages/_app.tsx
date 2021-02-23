import * as React from 'react'
import App, { AppContext } from 'next/app'
import Head from 'next/head'
import { AppProvider } from '@shopify/polaris'
import { Provider } from '@shopify/app-bridge-react'
import translations from '@shopify/polaris/locales/en.json'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import ClientRouter from '../components/ClientRouter'

import '@shopify/polaris/dist/styles.css'

const client = new ApolloClient({
  fetchOptions: {
    credentials: 'include'
  }
})

class MyApp extends App<{ shopOrigin: string }> {
  render() {
    const { Component, pageProps, shopOrigin } = this.props

    const config = { apiKey: API_KEY, shopOrigin, forceRedirect: true }

    return (
      <React.Fragment>
        <Head>
          <title>Sample App</title>
          <meta charSet='utf-8' />
        </Head>
        <Provider config={config}>
          <ClientRouter />
          <AppProvider i18n={translations}>
            <ApolloProvider client={client}>
              <Component {...pageProps} />
            </ApolloProvider>
          </AppProvider>
        </Provider>
      </React.Fragment>
    )
  }
}

MyApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
  let pageProps = {}

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }
  return {
    shopOrigin: ctx.query.shop,
    pageProps
  }
}

export default MyApp
