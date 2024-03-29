import classes from './classes.json' with { type: 'json' }
import dndLanguages from './languages.json' with { type: 'json' }
import npcNames from './names.json' with { type: 'json' }
import occupations from './occupations.json' with { type: 'json' }
import races from './races.json' with { type: 'json' }
import subclasses from './subclasses.json' with { type: 'json' }
import townNames from './towns.json' with { type: 'json' }

// Make classes, languages, occupations, and races customizable
let availableClasses = [ ...classes ]
let availableLanguages = [ ...dndLanguages ]
let availableOccupations = [ ...occupations ]
let availableRaces = { ...races }
let availableSubclasses = JSON.parse(JSON.stringify(subclasses))

// Make NPC name parts customizable
const { givenNames, familyNames } = npcNames
const { male, female } = givenNames
let maleGivenNames = [ ...male ]
let femaleGivenNames = [ ...female ]
let npcFamilyNames = [ ...familyNames ]

// Make name parts customizable
const {
  descriptors, prefixes, suffixes, postDescriptors, premades,
} = townNames
let townNameDescriptors = [ ...descriptors ]
let townNamePrefixes = [ ...prefixes ]
let townNameSuffixes = [ ...suffixes ]
let townNamePostDescriptors = [ ...postDescriptors ]
let townNamePremades = [ ...premades ]

export function customizeArrayData(newData, dataType, replace) {
  // Make sure newData has correct shape
  if (newData?.constructor !== Array) throw Error('customizeArrayData(): newData must be an Array.')
  if (Object.values(newData).some((newClass) => newClass.constructor !== String)) throw Error('customizeArrayData(): newData must be an Array of strings.')
  if (![ 'classes', 'languages', 'occupations' ].includes(dataType)) throw Error('customizeArrayData(): dataType must be one of: classes, languages, or occupations.')

  // Update data!
  if (dataType === 'classes') {
    availableClasses = [ ...(replace ? newData : [ ...availableClasses, ...newData ]) ]
    return availableClasses
  }

  if (dataType === 'languages') {
    availableLanguages = [ ...(replace ? newData : [ ...availableLanguages, ...newData ]) ]
    return availableLanguages
  }

  if (dataType === 'occupations') {
    availableOccupations = [ ...(replace ? newData : [ ...availableOccupations, ...newData ]) ]
    return availableOccupations
  }
}

function customizeRacesData(newRaces, replace) {
  // Make sure newRaces has correct shape
  if (newRaces?.constructor !== Object) throw Error('customizeRacesData(): newRaces must be an Object.')
  if (Object.values(newRaces).some((newClass) => newClass.constructor !== Object)) throw Error('customizeRacesData(): newRaces must be an Object of Race Objects.')
  if (Object.values(newRaces).some((newClass) => !newClass.name || newClass.name.constructor !== String)) throw Error('customizeRacesData(): newRaces must be Object and have a `name` string property.')

  // Apply Human properties as fallback values for certain data properties.
  // Allow user to customize with own data properties.
  // Allow user to override existing race objects
  const normalizedRaces = Object.values(newRaces).reduce((acc, newRace) => ({ ...acc, [newRace.name]: { ...races.Human, ...newRace } }), {})

  // Update data!
  availableRaces = replace ? normalizedRaces : { ...availableRaces, ...normalizedRaces }
  return availableRaces
}

export const data = {
  classes: {
    /**
     * @description Gets available classes after customizations.
     * @returns {Array} List of available classes.
     */
    get() { return availableClasses },

    /**
     * @description Gets the original classes provided by ttrpg-tools.
     * @returns {Array} List of available classes. These are not necessarily the languages that are available.
     */
    getOriginal() { return classes },

    /**
     * @description Add new (or replace) classes with a custom list of classes.
     * @param {Array} newClasses - An array of strings, custom classes to add.
     * @param {Boolean} replace - Whether to replace the available classes with the newClasses.
     * @returns {Array} New list of available classes.
     */
    customize(newClasses, replace) { return customizeArrayData(newClasses, 'classes', replace) },

    /**
     * @description Reset customizations to original set of classes.
     * @returns {undefined}
     */
    reset() { availableClasses = [ ...classes ] },
  },
  languages: {
    /**
     * @description Gets available languages after customizations.
     * @returns {Array} List of available languages.
     */
    get() { return availableLanguages },

    /**
     * @description Gets the original languages provided by ttrpg-tools.
     * @returns {Array} List of available languages. These are not necessarily the languages that are available.
     */
    getOriginal() { return dndLanguages },

    /**
     * @description Add new (or replace) languages with a custom list of languages.
     * @param {Array} newLanguages - An array of strings, custom languages to add.
     * @param {Boolean} replace - Whether to replace the available languages with the newlanguages.
     * @returns {Array} New list of available languages.
     */
    customize(newLanguages, replace) { return customizeArrayData(newLanguages, 'languages', replace) },

    /**
     * @description Reset customizations to original set of languages.
     * @returns {undefined}
     */
    reset() { availableLanguages = [ ...dndLanguages ] },
  },
  npcNames: {
    /**
     * @description Gets available NPC Names after customizations.
     * @returns {Object} Lists of available name parts for generating NPC names.
     */
    get() {
      return ({
        givenNames: {
          male: maleGivenNames,
          female: femaleGivenNames,
        },
        familyNames: npcFamilyNames,
      })
    },

    /**
     * @description Gets the original NPC Names provided by ttrpg-tools.
     * @returns {Array} List of original NPC Name parts. These are not necessarily the NPC name parts that are available.
     */
    getOriginal() { return npcNames },

    /**
     * @description Add new (or replace) NPC Name parts with a custom list of NPC Name parts.
     * @param {Object} newData - An object of name parts. Expected properties: `givenNames` and `familyNames`.
     * @param {Boolean} replace - Whether to replace the available NPC Name parts with the newData.
     * @returns {Array} New list of available NPC Name parts.
     */
    customize(newData, replace) {
      const { givenNames: newGivenNames, familyNames: newFamilyNames } = newData
      const { male: newMaleNames, female: newFemaleNames } = newGivenNames ?? {}

      // Make sure newData has correct shape
      if (newData?.constructor !== Object) throw Error('customizeNpcNameData(): newData must be an object.')
      if (!newFamilyNames && !newGivenNames) throw Error('customizeNpcNameData(): newData must have at least one of these properties: familyNames, givenNames.')
      if (newGivenNames && newGivenNames?.constructor !== Object) throw Error('customizeNpcNameData(): givenNames must be an object.')
      if (newGivenNames && !(newGivenNames.male || newGivenNames.female)) throw Error('customizeNpcNameData(): givenNames must have at least one of these properties: female, male.')
      if (newFamilyNames && (newFamilyNames.constructor !== Array || newFamilyNames.some((newFamilyName) => newFamilyName.constructor !== String))) throw Error('customizeNpcNameData(): newData.familyNames must be an Array of strings.')
      if (newMaleNames && (newMaleNames.constructor !== Array || newMaleNames.some((newMaleName) => newMaleName.constructor !== String))) throw Error('customizeNpcNameData(): newData.givenNames.male must be an Array of strings.')
      if (newFemaleNames && (newFemaleNames.constructor !== Array || newFemaleNames.some((newFemaleName) => newFemaleName.constructor !== String))) throw Error('customizeNpcNameData(): newData.givenNames.female must be an Array of strings.')

      // Update data!
      if (newFamilyNames) npcFamilyNames = replace ? newFamilyNames : [ ...npcFamilyNames, ...newFamilyNames ]
      if (newMaleNames) maleGivenNames = replace ? newMaleNames : [ ...maleGivenNames, ...newMaleNames ]
      if (newFemaleNames) femaleGivenNames = replace ? newFemaleNames : [ ...femaleGivenNames, ...newFemaleNames ]

      return data.npcNames.get()
    },

    /**
     * @description Reset customizations to original set of NPC Name parts.
     * @returns {undefined}
     */
    reset() {
      maleGivenNames = [ ...male ]
      femaleGivenNames = [ ...female ]
      npcFamilyNames = [ ...familyNames ]
    },
  },
  occupations: {
    /**
     * @description Gets available occupations after customizations.
     * @returns {Array} List of available occupations.
     */
    get() { return availableOccupations },

    /**
     * @description Gets the original occupations provided by ttrpg-tools.
     * @returns {Array} List of original occupations. These are not necessarily the languages that are available.
     */
    getOriginal() { return occupations },

    /**
     * @description Add new (or replace) occupations with a custom list of occupations.
     * @param {Array} newOccupations - An array of strings, custom occupations to add.
     * @param {Boolean} replace - Whether to replace the available occupations with the newOccupations.
     * @returns {Array} New list of available occupations.
     */
    customize(newOccupations, replace) { return customizeArrayData(newOccupations, 'occupations', replace) },

    /**
     * @description Reset customizations to original set of occupations.
     * @returns {undefined}
     */
    reset() { availableOccupations = [ ...occupations ] },
  },
  races: {
    /**
     * @description Gets available races after customizations.
     * @returns {Array} List of available races.
     */
    get() { return availableRaces },

    /**
     * @description Gets the original races provided by ttrpg-tools.
     * @returns {Array} List of available races. These are not necessarily the languages that are available.
     */
    getOriginal() { return races },

    /**
     * @description Add new (or replace) races with a custom list of races.
     * @param {Object} newRaces - An array of strings, custom races to add.
     * @param {Boolean} replace - Whether to replace the available races with the newRaces.
     * @returns {Array} New list of available races.
     */
    customize(newRaces, replace) { return customizeRacesData(newRaces, replace) },

    /**
     * @description Reset customizations to original set of races.
     * @returns {undefined}
     */
    reset() { availableRaces = { ...races } },
  },
  subclasses: {
    /**
     * @description Gets available subclasses after customizations.
     * @param {string} npcClass - Which class to get subclasses for.
     * @returns {Array} List of available subclasses.
     */
    get(npcClass) { return availableSubclasses[npcClass] },

    /**
     * @description Gets the original subclasses provided by ttrpg-tools.
     * @returns {Array} List of available subclasses. These are not necessarily the languages that are available.
     */
    getOriginal() { return subclasses },

    /**
     * @description Add new (or replace) subclasses with a custom list of subclasses.
     * @param {string} npcClass - Which class to customize subclasses for.
     * @param {Array} newsubclasses - An array of strings, custom subclasses to add.
     * @param {Boolean} replace - Whether to replace the available subclasses with the newsubclasses.
     * @returns {Array} New list of available subclasses.
     */
    customize(npcClass, newsubclasses, replace) {
      availableSubclasses = { ...availableSubclasses, [npcClass]: [ ...(replace ? newsubclasses : [ ...availableSubclasses[npcClass], ...newsubclasses ]) ] }
      return availableSubclasses
    },

    /**
     * @description Reset customizations to original set of subclasses.
     * @returns {undefined}
     */
    reset() { availableSubclasses = JSON.parse(JSON.stringify(subclasses)) },
  },
  townNames: {
    /**
     * @description Gets available townNames after customizations.
     * @returns {Object} Lists of available name parts for generating town names.
     */
    get() {
      return ({
        descriptors: townNameDescriptors,
        prefixes: townNamePrefixes,
        suffixes: townNameSuffixes,
        postDescriptors: townNamePostDescriptors,
        premades: townNamePremades,
      })
    },

    /**
     * @description Gets the original town name parts provided by ttrpg-tools.
     * @returns {Array} List of original town name parts. These are not necessarily the town name parts that are available.
     */
    getOriginal() { return townNames },

    /**
     * @description Add new (or replace) town name parts with a custom list of town name parts.
     * @param {Object} newData - An object of name parts. Expected properties: `descriptors`, `prefixes`, `suffixes`, `postDescriptors`.
     * @param {Boolean} replace - Whether to replace the available townNames with the newData.
     * @returns {Array} New list of available town name parts.
     */
    customize(newData, replace) {
      const {
        descriptors: newDescriptors, prefixes: newPrefixes, suffixes: newSuffixes, postDescriptors: newPostDescriptors, premades: newPremades,
      } = newData ?? {}

      // Make sure newData has correct shape
      if (newData?.constructor !== Object) throw Error('customizeTownNameData(): newData must be an object.')
      if (!newDescriptors && !newPrefixes && !newSuffixes && !newPostDescriptors) throw Error('customizeTownNameData(): newData must have at least one of these properties: descriptors, prefixes, suffixes, postDescriptors.')
      if (newDescriptors && (newDescriptors.constructor !== Array || newDescriptors.some((newDescriptor) => newDescriptor.constructor !== String))) throw Error('customizeTownNameData(): newData.descriptors must be an Array of strings.')
      if (newPrefixes && (newPrefixes.constructor !== Array || newPrefixes.some((newPrefix) => newPrefix.constructor !== String))) throw Error('customizeTownNameData(): newData.prefixes must be an Array of strings.')
      if (newSuffixes && (newSuffixes.constructor !== Array || newSuffixes.some((newSuffix) => newSuffix.constructor !== String))) throw Error('customizeTownNameData(): newData.suffixes must be an Array of strings.')
      if (newPostDescriptors && (newPostDescriptors.constructor !== Array || newPostDescriptors.some((newPostDescriptor) => newPostDescriptor.constructor !== String))) throw Error('customizeTownNameData(): newData.postDescriptors must be an Array of strings.')

      // Update data!
      if (newDescriptors) townNameDescriptors = replace ? newDescriptors : [ ...townNameDescriptors, ...newDescriptors ]
      if (newPrefixes) townNamePrefixes = replace ? newPrefixes : [ ...townNamePrefixes, ...newPrefixes ]
      if (newSuffixes) townNameSuffixes = replace ? newSuffixes : [ ...townNameSuffixes, ...newSuffixes ]
      if (newPostDescriptors) townNamePostDescriptors = replace ? newPostDescriptors : [ ...townNamePostDescriptors, ...newPostDescriptors ]
      if (newPremades) townNamePremades = replace ? newPremades : [ ...townNamePremades, ...newPremades ]

      return data.townNames.get()
    },

    /**
     * @description Reset customizations to original set of town name parts.
     * @returns {undefined}
     */
    reset() {
      townNameDescriptors = [ ...descriptors ]
      townNamePrefixes = [ ...prefixes ]
      townNameSuffixes = [ ...suffixes ]
      townNamePostDescriptors = [ ...postDescriptors ]
      townNamePremades = [ ...premades ]
    },
  },
}
