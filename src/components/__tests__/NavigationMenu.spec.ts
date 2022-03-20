import { shallowMount } from '@vue/test-utils'
import NavigationMenu from '../NavigationMenu.vue'
import { NTabs } from 'naive-ui'
/**
 * NOTE: `const defaultOptions: any` - any type has been added in order to fix typings issue in runtime
 * This workaround decribed here: https://github.com/vuejs/test-utils/issues/194#issuecomment-694167869
 */
const defaultOptions: any = {
  props: {
    selectedItem: 'test',
    menu: [{
      name: 'test',
      label: 'Test menu item'
    }]
  }
}

describe('NavigationMenu.vue', () => {
  describe('Rendering', () => {
    it('should renders correctly', () => {
      const wrapper = shallowMount(NavigationMenu, defaultOptions)
      expect(wrapper.element).toMatchSnapshot()
    })
  })

  describe('Functional', () => {
    it('custom event @update:value should be handled correct', () => {
      const wrapper = shallowMount(NavigationMenu, defaultOptions)

      const updatedData = 'New test value'
      const navTabElement = wrapper.findComponent(NTabs)
      navTabElement.vm.$emit('update:value', updatedData)

      const updateNavigationEvent = wrapper.emitted('update:navigation')
      expect(updateNavigationEvent).toHaveLength(1)
      expect((updateNavigationEvent as unknown[])[0]).toEqual([updatedData])
    })
  })
})
