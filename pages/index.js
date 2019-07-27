import Head from 'next/head'
import fetch from 'isomorphic-unfetch'
import { omit } from 'lodash'
import theme, { colors } from '../components/theme'

import Emoji from '../components/emoji'

const Page = ({ users, custom }) => (
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
      <h2>
        Top users by reactions <span className="badge">{users.length}</span>
      </h2>
      <div className="users">
        {users.map(user => (
          <div className="user" key={user.uuid}>
            <h3>
              {user.name} <span className="badge">{user.reactionsTotal}</span>
            </h3>
            <ol>
              {Object.keys(user.reactions).map(name => (
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
        <a href="https://hackclub.com/community/" target="_blank">
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
        <a href="https://repl.it/@Hacker22/emoji-ranker" target="_blank">
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
        line-height: 1.125;
      }
      h1 {
        font-size: 3rem;
      }
      h1:first-of-type {
        color: ${colors.red};
        margin-bottom: 2rem;
      }
      h2 {
        font-size: 2rem;
      }
      h2:first-of-type {
        margin-bottom: 1.5rem;
      }
      h3 {
        font-size: 1.25rem;
      }
      .badge {
        color: ${colors.white};
        background: ${colors.muted};
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
      .users {
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
        grid-template-columns: repeat(auto-fill, minmax(48px, 1fr));
        grid-gap: 0.75rem;
      }
      ol li span {
        margin-left: 0.25rem;
      }
    `}</style>
    <style jsx global>{`
      * {
        box-sizing: border-box;
      }
      body {
        color: ${colors.slate};
        font-family: system-ui, -apple-system, BlinkMacSystemFont, Segoe UI,
          Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji,
          Segoe UI Symbol;
        line-height: 1.66;
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
        margin: 0;
      }
      p + p {
        margin-top: 0.25rem;
      }
      p > a {
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

Page.getInitialProps = ({ req }) =>
  fetch((req ? `http://${req.headers.host}` : '') + '/api/data').then(res =>
    res.json()
  )

export default Page
