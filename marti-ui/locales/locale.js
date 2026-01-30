import tr from './tr.json'
import de from './de.json'

const langs = { tr , de };

export default function locale(lang) {
    return langs[lang]
}