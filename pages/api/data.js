import fetch from 'isomorphic-unfetch'
import { pickBy, includes, omit, has } from 'lodash'

const dataPath = 'https://emoji-ranker.now.sh/data'
const channelsPath = 'https://emoji-ranker.now.sh/channeldata'
const customPath = 'https://emoji-ranker.now.sh/custompng'

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

  let channels = await fetch(channelsPath).then(data => data.json())
  channels = pickBy(
    channels,
    channel =>
      channel.reactions.total > 0 && channel.name.split(' ')[0] === channel.name
  )
  channels = Object.values(channels)
  channels = channels.map(({ uuid, name, reactions }) => ({
    uuid,
    name,
    reactionsTotal: reactions.total,
    reactions: omit(reactions, 'total')
  }))

  let top = {}
  users
    .map(user => user.reactions)
    .map(reactionSet => {
      Object.keys(reactionSet).map(id => {
        // either add to top or increase quanity in top
        if (has(top, id)) {
          top[id] += reactionSet[id]
        } else {
          top[id] = reactionSet[id]
        }
      })
    })
  // filter for >1
  top = pickBy(top, (value, key) => value > 1)
  // sort by amount
  top = Object.entries(top)
    .sort((a, b) => b[1] - a[1])
    .reduce((o, [k, v]) => ((o[k] = v), o), {})

  const json = { top, channels, users, custom }
  res.json(json)
}
