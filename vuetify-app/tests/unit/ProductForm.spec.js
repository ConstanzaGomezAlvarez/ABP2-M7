import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import ProductForm from '../../src/components/ProductForm.vue'

describe('ProductForm', () => {
  it('emite save con datos válidos', async () => {
    const wrapper = mount(ProductForm)
    await wrapper.find('input[name="nombre"]').setValue('Producto X')
    await wrapper.find('input[name="precio"]').setValue('123')
    await wrapper.find('form').trigger('submit.prevent')
    const ev = wrapper.emitted('save')
    expect(ev).toBeTruthy()
    const payload = ev[0][0]
    expect(payload.nombre).toBe('Producto X')
    expect(payload.precio).toBe(123)
  })
})
