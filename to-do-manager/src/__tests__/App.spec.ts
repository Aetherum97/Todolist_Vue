import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('App', () => {
  it('renders the header', () => {
    const wrapper = mount(App)
    expect(wrapper.find('header').exists()).toBe(true)
  })

  it('renders the footer', () => {
    const wrapper = mount(App)
    expect(wrapper.find('footer').exists()).toBe(true)
  })

  it('renders the task form', () => {
    const wrapper = mount(App)
    expect(wrapper.find('form').exists()).toBe(true)
  })

  it('adds a task when the form is submitted with a valid title', async () => {
    const wrapper = mount(App)
    const input = wrapper.find('input#task-title')
    await input.setValue('My new task')
    await wrapper.find('form').trigger('submit')
    expect(wrapper.text()).toContain('My new task')
  })

  it('shows an error when the form is submitted with an empty title', async () => {
    const wrapper = mount(App)
    await wrapper.find('form').trigger('submit')
    expect(wrapper.find('[role="alert"]').exists()).toBe(true)
  })
})
