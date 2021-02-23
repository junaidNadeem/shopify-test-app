import * as React from 'react'
import { useState } from 'react'
import { Layout, Page, EmptyState } from '@shopify/polaris'
import { TitleBar, ResourcePicker } from '@shopify/app-bridge-react'
import store from 'store-js'

import ResourceListWithProducts from '../components/ResourceList'

const img = 'https://cdn.shopify.com/s/files/1/0757/9955/files/empty-state.svg'

const Index = () => {
  const [open, setOpen] = useState(false)
  const emptyState = !store.get('ids')

  const handleSelection = (resources) => {
    const idsFromResources = resources.selection.map((product) => product.id)
    store.set('ids', idsFromResources)
    setOpen(false)
  }

  return (
    <Page>
      {emptyState ? (
        <Layout>
          <TitleBar
            title='Sample App'
            primaryAction={{
              content: 'Select products',
              onAction: () => setOpen(true)
            }}
          />
          <ResourcePicker
            resourceType='Product'
            showVariants={false}
            open={open}
            onSelection={(resources) => handleSelection(resources)}
            onCancel={() => setOpen(false)}
          />
          <EmptyState
            heading='Discount your products temporarily'
            action={{
              content: 'Select products',
              onAction: () => setOpen(true)
            }}
            image={img}
          >
            <p>Select products</p>
          </EmptyState>
        </Layout>
      ) : (
        <ResourceListWithProducts />
      )}
    </Page>
  )
}

export default Index
