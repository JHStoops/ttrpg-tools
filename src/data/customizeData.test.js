import classes from './classes.json'
import languages from './languages.json'
import npcNames from './names.json'
import occupations from './occupations.json'
import races from './races.json'
import townNames from './towns.json'
import { customizeArrayData, data } from './customizeData.js'

describe('customizeData', () => {
  describe('classes', () => {
    const customClasses = [ 'customizing', 'classes', 'is', 'fun!' ]

    beforeEach(() => {
      data.classes.reset()
    })

    it('should get available classes', () => {
      expect(data.classes.get()).toEqual(classes)
    })

    it('should get original classes', () => {
      expect(data.classes.getOriginal()).toEqual(classes)
    })

    it('should customize classes (replace)', () => {
      const customizedClasses = data.classes.customize(customClasses, true)
      expect(customizedClasses).toEqual(customClasses)
    })

    it('should customize classes (append)', () => {
      const customizedClasses = data.classes.customize(customClasses)
      expect(customizedClasses).toEqual([ ...classes, ...customClasses ])
    })

    it('should reset classes', () => {
      const customizedClasses = data.classes.customize(customClasses, true)

      // First make sure customization took place
      expect(customizedClasses).toEqual(customClasses)

      // Then test that reset takes place
      data.classes.reset()
      expect(data.classes.get()).toEqual(classes)
    })
  })

  describe('languages', () => {
    const customLanguages = [ 'customizing', 'languages', 'is', 'fun!' ]

    beforeEach(() => {
      data.languages.reset()
    })

    it('should get available languages', () => {
      expect(data.languages.get()).toEqual(languages)
    })

    it('should get original languages', () => {
      expect(data.languages.getOriginal()).toEqual(languages)
    })

    it('should customize languages (replace)', () => {
      const customizedLanguages = data.languages.customize(customLanguages, true)
      expect(customizedLanguages).toEqual(customLanguages)
    })

    it('should customize languages (append)', () => {
      const customizedLanguages = data.languages.customize(customLanguages)
      expect(customizedLanguages).toEqual([ ...languages, ...customLanguages ])
    })

    it('should reset languages', () => {
      const customizedLanguages = data.languages.customize(customLanguages, true)

      // First make sure customization took place
      expect(customizedLanguages).toEqual(customLanguages)

      // Then test that reset takes place
      data.languages.reset()
      expect(data.languages.get()).toEqual(languages)
    })
  })

  describe('npcNames', () => {
    const customNpcNames = {
      givenNames: {
        male: [ 'Bruce' ],
        female: [ 'Alex' ],
      },
      familyNames: [ 'Banner' ],
    }

    beforeEach(() => {
      data.npcNames.reset()
    })

    it('should get available npcNames', () => {
      expect(data.npcNames.get()).toEqual(npcNames)
    })

    it('should get original npcNames', () => {
      expect(data.npcNames.getOriginal()).toEqual(npcNames)
    })

    it('should customize npcNames (replace)', () => {
      const customizedNpcNames = data.npcNames.customize(customNpcNames, true)
      expect(customizedNpcNames).toEqual(customNpcNames)
    })

    it('should customize npcNames (append)', () => {
      const customizedNpcNames = data.npcNames.customize(customNpcNames)
      expect(customizedNpcNames.givenNames.male).toEqual([ ...npcNames.givenNames.male, ...customNpcNames.givenNames.male ])
      expect(customizedNpcNames.givenNames.female)
        .toEqual([ ...npcNames.givenNames.female, ...customNpcNames.givenNames.female ])
      expect(customizedNpcNames.familyNames).toEqual([ ...npcNames.familyNames, ...customNpcNames.familyNames ])
    })

    it('should reset npcNames', () => {
      const customizedNpcNames = data.npcNames.customize(customNpcNames, true)

      // First make sure customization took place
      expect(customizedNpcNames).toEqual(customNpcNames)

      // Then test that reset takes place
      data.npcNames.reset()
      expect(data.npcNames.get()).toEqual(npcNames)
    })

    it('should throw an error if newData is not an Object', () => {
      expect(() => data.npcNames.customize(JSON.stringify(customNpcNames))).toThrow(Error('customizeNpcNameData(): newData must be an object.'))
    })

    it('should throw an error if lacking properties: givenNames, familyNames.', () => {
      expect(() => data.npcNames.customize({ name: 'Strahd' })).toThrow(Error('customizeNpcNameData(): newData must have at least one of these properties: familyNames, givenNames.'))
    })

    it('should throw an error if givenNames is not an Object', () => {
      expect(() => data.npcNames.customize({ givenNames: 'hello darkness my old friend' })).toThrow(Error('customizeNpcNameData(): givenNames must be an object.'))
    })

    it('should throw an error if givenNames is lacking properties: male, female.', () => {
      expect(() => data.npcNames.customize({ givenNames: { unisex: [ 'Alex' ] } })).toThrow(Error('customizeNpcNameData(): givenNames must have at least one of these properties: female, male.'))
    })

    it('should throw an error if male givenNames is present but not an Array', () => {
      expect(() => data.npcNames.customize({ givenNames: { male: 'Chad-Brad' } })).toThrow(Error('customizeNpcNameData(): newData.givenNames.male must be an Array of strings.'))
    })

    it('should throw an error if female givenNames is present but not an Array', () => {
      expect(() => data.npcNames.customize({ givenNames: { female: 'Karen-Speak-With-Managér' } })).toThrow(Error('customizeNpcNameData(): newData.givenNames.female must be an Array of strings.'))
    })

    it('should throw an error if familyNames is present but not an Array', () => {
      expect(() => data.npcNames.customize({ familyNames: 'hello darkness my old friend' })).toThrow(Error('customizeNpcNameData(): newData.familyNames must be an Array of strings.'))
    })

    it('should throw an error if male givenNames is present but not an Array of Strings', () => {
      expect(() => data.npcNames.customize({ givenNames: { male: [ 1, 2, 3 ] } })).toThrow(Error('customizeNpcNameData(): newData.givenNames.male must be an Array of strings.'))
    })

    it('should throw an error if female givenNames is present but not an Array of Strings', () => {
      expect(() => data.npcNames.customize({ givenNames: { female: [ 1, 2, 3 ] } })).toThrow(Error('customizeNpcNameData(): newData.givenNames.female must be an Array of strings.'))
    })

    it('should throw an error if familyNames is present but not an Array of Strings', () => {
      expect(() => data.npcNames.customize({ familyNames: [ 1, 2, 3 ] })).toThrow(Error('customizeNpcNameData(): newData.familyNames must be an Array of strings.'))
    })
  })

  describe('occupations', () => {
    const customOccupations = [ 'customizing', 'occupations', 'is', 'fun!' ]

    beforeEach(() => {
      data.occupations.reset()
    })

    it('should get available occupations', () => {
      expect(data.occupations.get()).toEqual(occupations)
    })

    it('should get original occupations', () => {
      expect(data.occupations.getOriginal()).toEqual(occupations)
    })

    it('should customize occupations (replace)', () => {
      const customizedOccupations = data.occupations.customize(customOccupations, true)
      expect(customizedOccupations).toEqual(customOccupations)
    })

    it('should customize occupations (append)', () => {
      const customizedOccupations = data.occupations.customize(customOccupations)
      expect(customizedOccupations).toEqual([ ...occupations, ...customOccupations ])
    })

    it('should reset occupations', () => {
      const customizedOccupations = data.occupations.customize(customOccupations, true)

      // First make sure customization took place
      expect(customizedOccupations).toEqual(customOccupations)

      // Then test that reset takes place
      data.occupations.reset()
      expect(data.occupations.get()).toEqual(occupations)
    })
  })

  describe('races', () => {
    const customRaces = {
      'Couch Potato': {
        name: 'Couch Potato',
        avgAgeOfDeath: 52,
      },
    }

    beforeEach(() => {
      data.races.reset()
    })

    it('should get available races', () => {
      expect(data.races.get()).toEqual(races)
    })

    it('should get original races', () => {
      expect(data.races.getOriginal()).toEqual(races)
    })

    it('should customize races (replace)', () => {
      const customizedRaces = data.races.customize(customRaces, true)
      expect(Object.keys(customizedRaces)).toEqual(Object.keys(customRaces))
    })

    it('should customize races (append)', () => {
      const customizedRaces = data.races.customize(customRaces)
      expect(Object.keys(customizedRaces)).toEqual([ ...Object.keys(races), ...Object.keys(customRaces) ])
    })

    it('should reset races', () => {
      const customizedRaces = data.races.customize(customRaces, true)

      // First make sure customization took place
      expect(Object.keys(customizedRaces)).toEqual(Object.keys(customRaces))

      // Then test that reset takes place
      data.races.reset()
      expect(data.races.get()).toEqual(races)
    })

    it('should throw an error if newRaces is not an Object', () => {
      expect(() => data.races.customize('Hello cruel world!')).toThrow(Error('customizeRacesData(): newRaces must be an Object.'))
    })

    it('should throw an error if elements in newRaces are not an Object', () => {
      expect(() => data.races.customize({ Orcs: 'taking the hobbits to Isengard.' })).toThrow(Error('customizeRacesData(): newRaces must be an Object of Race Objects.'))
    })

    it('should throw an error if elements in newRaces do not have the name property', () => {
      expect(() => data.races.customize({ Orcs: { size: 'medium' } })).toThrow(Error('customizeRacesData(): newRaces must be Object and have a `name` string property.'))
    })
  })

  describe('townNames', () => {
    const customTownNames = {
      descriptors: [ 'New' ],
      prefixes: [ 'York' ],
      suffixes: [ ' City' ],
      postDescriptors: [ 'in the West' ],
      premades: [ 'Old York City of the East' ],
    }

    beforeEach(() => {
      data.townNames.reset()
    })

    it('should get available townNames', () => {
      expect(data.townNames.get()).toEqual(townNames)
    })

    it('should get original townNames', () => {
      expect(data.townNames.getOriginal()).toEqual(townNames)
    })

    it('should customize townNames (replace)', () => {
      const customizedTownNames = data.townNames.customize(customTownNames, true)
      expect(customizedTownNames).toEqual(customTownNames)
    })

    it('should customize townNames (append)', () => {
      const customizedTownNames = data.townNames.customize(customTownNames)
      expect(customizedTownNames.descriptors).toEqual([ ...townNames.descriptors, ...customTownNames.descriptors ])
      expect(customizedTownNames.prefixes).toEqual([ ...townNames.prefixes, ...customTownNames.prefixes ])
      expect(customizedTownNames.suffixes).toEqual([ ...townNames.suffixes, ...customTownNames.suffixes ])
      expect(customizedTownNames.postDescriptors).toEqual([ ...townNames.postDescriptors, ...customTownNames.postDescriptors ])
    })

    it('should reset townNames', () => {
      const customizedTownNames = data.townNames.customize(customTownNames, true)

      // First make sure customization took place
      expect(customizedTownNames).toEqual(customTownNames)

      // Then test that reset takes place
      data.townNames.reset()
      expect(data.townNames.get()).toEqual(townNames)
    })

    it('should throw an error if newData is not an Object', () => {
      expect(() => data.townNames.customize()).toThrow(Error('customizeTownNameData(): newData must be an object.'))
    })

    it('should throw an error if lacking properties: descriptors, prefixes, and suffixes.', () => {
      expect(() => data.townNames.customize({ friendInElven: 'Melon' })).toThrow(Error('customizeTownNameData(): newData must have at least one of these properties: descriptors, prefixes, suffixes, postDescriptors.'))
    })

    it('should throw an error if descriptors is present but not an Array', () => {
      expect(() => data.townNames.customize({ descriptors: 'Lower' })).toThrow(Error('customizeTownNameData(): newData.descriptors must be an Array of strings.'))
    })

    it('should throw an error if prefixes is present but not an Array', () => {
      expect(() => data.townNames.customize({ prefixes: 'Oak' })).toThrow(Error('customizeTownNameData(): newData.prefixes must be an Array of strings.'))
    })

    it('should throw an error if suffixes is present but not an Array', () => {
      expect(() => data.townNames.customize({ suffixes: 'City' })).toThrow(Error('customizeTownNameData(): newData.suffixes must be an Array of strings.'))
    })

    it('should throw an error if descriptors is present but not an Array of Strings', () => {
      expect(() => data.townNames.customize({ descriptors: [ 1, 2, 3 ] })).toThrow(Error('customizeTownNameData(): newData.descriptors must be an Array of strings.'))
    })

    it('should throw an error if prefixes is present but not an Array of Strings', () => {
      expect(() => data.townNames.customize({ prefixes: [ 1, 2, 3 ] })).toThrow(Error('customizeTownNameData(): newData.prefixes must be an Array of strings.'))
    })

    it('should throw an error if suffixes is present but not an Array of Strings', () => {
      expect(() => data.townNames.customize({ suffixes: [ 1, 2, 3 ] })).toThrow(Error('customizeTownNameData(): newData.suffixes must be an Array of strings.'))
    })
  })

  describe('customizeArrayData', () => {
    it('should throw an error if newData is not an Array', () => {
      expect(() => customizeArrayData('I am a new class outside of an array!', 'classes')).toThrow(Error('customizeArrayData(): newData must be an Array.'))
    })

    it('should throw an error if newData is not an Array of Strings', () => {
      expect(() => customizeArrayData([ 1, 2, 3 ], 'languages')).toThrow(Error('customizeArrayData(): newData must be an Array of strings.'))
    })

    it('should throw an error if dataType is not one of: classes, languages, or occupations', () => {
      expect(() => customizeArrayData([ 'strange things', 'stranger things', 'strangest things' ], 'things')).toThrow(Error('customizeArrayData(): dataType must be one of: classes, languages, or occupations.'))
    })
  })
})
