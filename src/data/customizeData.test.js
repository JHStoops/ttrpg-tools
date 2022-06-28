import classes from './classes.json'
import dndLanguages from './languages.json'
import npcNames from './names.json'
import occupations from './occupations.json'
import races from './races.json'
import townNames from './towns.json'
import { data } from './customizeData.js'

describe('customizeData', () => {
  describe('classes', () => {
    it('should get available classes', () => {
      expect(data.classes.get()).toEqual(classes)
    })

    it('should get original classes', () => {
      expect(data.classes.getOriginal()).toEqual(classes)
    })

    it('should customize classes', () => {
      const customClasses = [ 'customizing', 'classes', 'is', 'fun!' ]
      const customizedClasses = data.classes.customize(customClasses, true)

      expect(customizedClasses).toEqual(customClasses)
    })

    it('should reset classes', () => {
      const customClasses = [ 'customizing', 'classes', 'is', 'fun!' ]
      const customizedClasses = data.classes.customize(customClasses, true)

      // First make sure customization took place
      expect(customizedClasses).toEqual(customClasses)

      // Then test that reset takes place
      data.classes.reset()
      expect(data.classes.get()).toEqual(classes)
    })
  })

  describe('languages', () => {
    it.todo('should get available languages')
    it.todo('should get original languages')
    it.todo('should customize languages')
    it.todo('should reset languages')
  })

  describe('npcNames', () => {
    it.todo('should get available npcNames')
    it.todo('should get original npcNames')
    it.todo('should customize npcNames')
    it.todo('should reset npcNames')
  })

  describe('occupations', () => {
    it.todo('should get available occupations')
    it.todo('should get original occupations')
    it.todo('should customize occupations')
    it.todo('should reset occupations')
  })

  describe('races', () => {
    it.todo('should get available races')
    it.todo('should get original races')
    it.todo('should customize races')
    it.todo('should reset races')
  })

  describe('townNames', () => {
    it.todo('should get available townNames')
    it.todo('should get original townNames')
    it.todo('should customize townNames')
    it.todo('should reset townNames')
  })
})
