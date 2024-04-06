/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import Logo from '@/public/huggerlogo.jpg'
import chatWithModel from '@/app/utils/model-api'
import { Box, Heading, Image, VStack,vars} from '@/app/ui'
type State = {
  conversations: []
}
 
const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  ui: { vars },
  initialState: {
    conversations: []
  }

  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame('/', (c) => {
  const { buttonValue, inputText, status } = c
  return c.res({
    image: (
      <>
        <div
          style={{
            alignItems: 'flex-start',
            display: 'flex',
            gap: 100,
            flexDirection: 'column',
            height: '100%',
            width: '100%',
            background: 'linear-gradient(to right, #432889, #17101F)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              width: '100%',
              borderBottom: '2px solid gray',
            }}
          >
            <span
              style={{
                color: 'white',
                fontSize: 48,
                fontStyle: 'normal',
                letterSpacing: '-0.025em',
                lineHeight: 1.4,
                marginTop: 10,
                padding: '0 120px',
                whiteSpace: 'pre-wrap',
              }}
            >
              Flock Therapy GPT
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              marginTop: 20,
              padding: '20px',
              width: '100%',
            }}
          >
            <Image objectFit="cover" height="128" borderRadius="20" src="/huggerlogo.jpg" />
            <span
              style={{
                color: 'white',
                fontSize: 28,
                fontStyle: 'normal',
                letterSpacing: '-0.025em',
                lineHeight: 1.4,
                marginTop: 16,
                maxWidth: '90%',
                padding: '0 120px',
                whiteSpace: 'pre-wrap',
              }}
            >
              Get Quick Therapy Sessions with Flock Therapy GPT click on start to proceed 👇👇👇
            </span>
          </div>
        </div>
      </>
    ),
    intents: [<Button action="/chat" value="Start">Start</Button>],
  })
})

app.frame('/chat', async (c) => {
  const { buttonValue, inputText, deriveState, status } = c

  const inputValue = inputText
  const button = buttonValue
  let chatResult: any



  try {
    // @ts-ignore
    if(inputValue && button) {
      chatResult = await chatWithModel(inputValue, button)

    }else {
      null
    }
  } catch (error) {
    chatResult = error
  }
  const convo = {
    user: inputValue!,
    bot: chatResult?.answer!,
  }
  const state = deriveState((previousState: any): any => {
    if (inputValue && chatResult?.answer) previousState.conversations.push(convo)
  })
  // const state = deriveState((previousState: any) => {
  //   if (buttonValue) previousState.conversations.push(buttonValue)
  // })
  const renderConvo = () => {
    if (!(state as any).conversations) return '';
    return (
     <div style={
      {
        display: 'flex',
        fontSize: 20,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        overflowY: 'auto',
        alignContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 50,
        padding: '20px',
        maxWidth: '60%',
      }
     }>
       <ul  style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            gap: 20,
           
      }} >
        {(state as any).conversations.map((conv: any, index: number) => (
          <li style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 5,
           
      }} >
           
              <span>You 👶🏼: {conv.user}</span>
             <br />
           
              <span>
                Therapy GPT 🤖 : {conv.bot}
              </span>
           
          </li>
        ))}
      </ul>

     </div>
    );
  }

console.log('state: ', state)
  return c.res({
    action: '/chat',
    image: (
      <div
        style={{
          background: status === 'response' ? 'linear-gradient(to right, #17101F)' : 'black',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          width: '100%',
          color: 'white',
          marginLeft: 60,
          
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 10,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {status !== 'response' && `Talk To me 🗣️`}
        </div>

      <>
      {status === 'response' && (renderConvo())}
      </>
      </div>
    ),
    intents: [
      <TextInput placeholder="Enter text..." />,
      <Button action="/chat" value="cluhggay2000zvkb4lycsiowo">
        Send
      </Button>,
      <Button action="/" value="Go Back">
        Go Back
      </Button>,
    ],
  })
})


devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
