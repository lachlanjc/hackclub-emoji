import fetch from 'isomorphic-unfetch'
import { pickBy, includes, omit } from 'lodash'

const dataPath = 'https://emoji-ranker--hacker22.repl.co/data'
const customPath = 'https://emoji-ranker--hacker22.repl.co/custompng'

export default async (req, res) => {
  let custom = await fetch(customPath).then(data => data.json())
  custom = pickBy(custom, (value, key) => !includes(value, 'alias'))
  // TODO: remap aliases
  let users = await fetch(dataPath).then(data => data.json())
  users = pickBy(users, user => user.reactions.total > 0)
  users = Object.values(users)
  users = users.map(({ uuid, name, reactions }) => ({
    uuid,
    name,
    reactionsTotal: reactions.total,
    reactions: omit(reactions, 'total')
  }))
  const json = { users, custom }
  res.json(json)
}
