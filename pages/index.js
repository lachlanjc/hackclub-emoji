import Head from 'next/head'
import theme, { colors } from '../components/theme'

import Emoji from '../components/emoji'

const Page = ({ top, channels, users, custom }) => (
  <main>
    <Head>
      <title>Hack Club Emoji</title>
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:site" content="@lachlanjc" />
      <meta
        property="twitter:description"
        content="An analysis of the emoji reactions used in the Hack Club Slack."
      />
      <meta property="og:title" content="Hack Club Emoji" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://hackclub-emoji.now.sh/" />
      <meta
        property="description"
        content="An analysis of the emoji reactions used in the Hack Club Slack."
      />
    </Head>
    <main className="container">
      <h1>Hack Club Emoji</h1>
      <h2>Top reactions</h2>
      <ol className="lg">
        {Object.keys(top).map((name) => (
          <li key={name}>
            <Emoji label={name} custom={custom} lg /> <span>{top[name]}</span>
          </li>
        ))}
      </ol>
      <h2>
        Reactions by channel
        <span className="badge">{channels.length}</span>
      </h2>
      <div className="grid">
        {channels.map((channel) => (
          <div className="grid-item" key={channel.uuid}>
            <h3>
              <a
                href={`https://hackclub.slack.com/messages/${channel.uuid}`}
                target=")blank"
              >
                #{channel.name}
              </a>
            </h3>
            <ol>
              {Object.keys(channel.reactions).map((name) => (
                <li key={name}>
                  <Emoji label={name} custom={custom} />{' '}
                  <span>{channel.reactions[name]}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
      <h2>
        Top users’ reactions
        <span className="badge">{users.length}</span>
      </h2>
      <div className="grid">
        {users.map((user) => (
          <div className="grid-item" key={user.uuid}>
            <h3>
              {user.name}
              <span className="badge">{user.reactionsTotal}</span>
            </h3>
            <ol>
              {Object.keys(user.reactions).map((name) => (
                <li key={name}>
                  <Emoji label={name} custom={custom} />{' '}
                  <span>{user.reactions[name]}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
      <p>
        An analysis of the emoji reactions used in the{' '}
        <a href="https://hackclub.com/slack/" target="_blank">
          Hack Club Slack
        </a>
        .
      </p>
      <p>
        Both the{' '}
        <a href="https://github.com/lachlanjc/hackclub-emoji/" target="_blank">
          frontend
        </a>{' '}
        &{' '}
        <a href="https://github.com/neelr/emoji-ranker" target="_blank">
          backend
        </a>{' '}
        are open source.
      </p>
      <p>
        Made by{' '}
        <a href="https://github.com/lachlanjc" target="_blank">
          Lachlan Campbell
        </a>
        {' & '}
        <a href="https://github.com/hacker719" target="_blank">
          Neel Redkar
        </a>
        , 2019.
      </p>
    </main>
    <style jsx>{`
      .container {
        margin: auto;
        padding: 3rem 1rem;
        max-width: 64rem;
      }
      h1,
      h2,
      h3,
      li {
        display: flex;
        align-items: center;
      }
      h1 {
        font-size: 3rem;
      }
      h1:first-of-type {
        color: ${colors.red};
      }
      h2 {
        font-size: 2rem;
        margin-top: 2rem;
        margin-bottom: 1.5rem;
      }
      h3 {
        font-size: 1.25rem;
      }
      .badge {
        background: ${colors.muted};
        color: ${colors.white};
        display: inline-block;
        font-size: 0.75rem;
        font-weight: 600;
        padding: 2px 8px;
        text-transform: uppercase;
        line-height: 1.25;
        border-radius: 24px;
        text-align: center;
        margin-left: 0.75rem;
      }
      @media (prefers-color-scheme: dark) {
        .badge {
          color: ${colors.darker};
        }
      }
      .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
        grid-gap: 2rem;
        margin-bottom: 2rem;
      }
      ol {
        padding-left: 0;
        list-style: none;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(3em, 1fr));
        grid-gap: 0.75rem;
      }
      ol.lg {
        font-size: 1.75em;
        margin-bottom: 3rem;
      }
    `}</style>
    <style jsx global>{`
      * {
        box-sizing: border-box;
      }
      body {
        color: ${colors.slate};
        font-family: 'Phantom Sans', system-ui, -apple-system,
          BlinkMacSystemFont, Segoe UI, Helvetica, Arial, sans-serif,
          Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol;
        line-height: 1.5;
        margin: 0;
        min-height: 100vh;
      }
      h1,
      h2,
      a {
        color: ${colors.black};
      }
      h3 {
        color: ${colors.steel};
      }
      h1 {
        font-weight: 900;
      }
      h2 {
        font-weight: 800;
      }
      h1,
      h2,
      h3,
      p {
        line-height: 1.125;
        margin: 0;
      }
      p + p {
        margin-top: 0.5rem;
      }
      a {
        text-decoration: underline;
        text-underline-position: under;
        -webkit-text-underline-position: under;
        text-decoration-style: wavy;
        -webkit-text-decoration-style: wavy;
      }
      @media (prefers-color-scheme: dark) {
        body {
          background-color: ${colors.dark};
          color: ${colors.muted};
        }
        h1,
        h2,
        a {
          color: ${colors.white};
        }
        h3 {
          color: ${colors.smoke};
        }
      }
    `}</style>
  </main>
)

export default Page

export const getStaticProps = async ({ req }) => {
  const api = require('./api/data').default
  const props = await api(req)
  return { props, unstable_revalidate: 1 }
}
