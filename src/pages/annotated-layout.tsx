import * as React from 'react'
import { useState } from 'react'
import {
  Button,
  Card,
  Form,
  FormLayout,
  Layout,
  Page,
  SettingToggle,
  Stack,
  TextField,
  TextStyle
} from '@shopify/polaris'

const AnnotatedLayout = () => {
  const [discount, setDiscount] = useState('10%')
  const [enabled, setEnabled] = useState(false)

  const contentStatus = enabled ? 'Disable' : 'Enable'
  const textStatus = enabled ? 'enabled' : 'disabled'

  const handleSubmit = () => {
    console.log('submission', { discount })
  }

  const handleChange = (field, value) => {
    switch (field) {
      case 'discount':
        setDiscount(value)
        break
    }
  }

  const handleToggle = () => {
    setEnabled(!enabled)
  }

  return (
    <Page>
      <Layout>
        <Layout.AnnotatedSection
          title='Default discount'
          description='Add a product to Sample App, it will automatically be discounted.'
        >
          <Card sectioned>
            <Form onSubmit={handleSubmit}>
              <FormLayout>
                <TextField
                  value={discount}
                  onChange={(value) => handleChange('discount', value)}
                  label='Discount percentage'
                  type='text'
                />
                <Stack distribution='trailing'>
                  <Button primary submit>
                    Save
                  </Button>
                </Stack>
              </FormLayout>
            </Form>
          </Card>
        </Layout.AnnotatedSection>
        <Layout.AnnotatedSection
          title='Price updates'
          description='Temporarily disable all Sample App price updates'
        >
          <SettingToggle
            action={{
              content: contentStatus,
              onAction: handleToggle
            }}
            enabled={enabled}
          >
            This setting is{' '}
            <TextStyle variation='strong'>{textStatus}</TextStyle>.
          </SettingToggle>
        </Layout.AnnotatedSection>
      </Layout>
    </Page>
  )
}

export default AnnotatedLayout
