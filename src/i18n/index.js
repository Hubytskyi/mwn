import en from './en.json'
import get from 'lodash/get'

export const i18n = (key, replacer = {}) => {
    return Object.entries(replacer).reduce((accum, [replacerKey, replacerValue]) => {
        return accum.replace(`{${replacerKey}}`, replacerValue)
    }, get(en, key, key))
}