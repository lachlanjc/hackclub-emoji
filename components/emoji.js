import Emoji from 'a11y-react-emoji'
import emojiLib from 'node-emoji'
import { includes } from 'lodash'

const stripColons = str => {
  const colonIndex = str.indexOf(':')
  if (colonIndex > -1) {
    // :emoji:
    if (colonIndex === str.length - 1) {
      str = str.substring(0, colonIndex)
      return stripColons(str)
    } else {
      str = str.substr(colonIndex + 1)
      return stripColons(str)
    }
  }
  return str
}

export default ({ custom = [], symbol, label, lg = false }) => {
  const isCustom = includes(Object.keys(custom), label)
  const customLabel = isCustom ? stripColons(label) : label
  return (
    <span>
      {isCustom ? (
        <img src={custom[customLabel]} alt={customLabel} width={lg ? 36 : 24} />
      ) : (
        <Emoji symbol={emojiLib.get(label)} label={label} />
      )}
      <style jsx>{`
        span {
          display: inline-block;
          width: 1.25em;
          margin-right: 0.5rem;
          line-height: 0;
        }
      `}</style>
    </span>
  )
}
