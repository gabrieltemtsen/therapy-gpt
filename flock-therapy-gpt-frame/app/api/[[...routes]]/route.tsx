/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import Logo from '@/public/huggerlogo.jpg'
import chatWithModel from '@/app/utils/model-api'

const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  
  // Supply a Hub to enable frame verification.
  hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

app.frame('/', (c) => {
  const { buttonValue, inputText, status } = c
  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background:
            status === 'response'
              ? 'linear-gradient(to right, #432889, #17101F)'
              : 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
        LOGO GOES HERE4
        
        {/* <Logo
          style={{
            height: 200,
            width: 200,
          }}
          /> */}

        <div
          style={{
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
          Therapy GPT here to be your guide
        </div>
        <div
          style={{
            color: 'white',
            fontSize: 48,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          Tell me How you are Feeling Today!
        </div>
      </div>
    ),
    intents: [
      <Button action='/chat' value="Start">Start</Button>,
      // <Button.Link href="https://flock.io">FLock</Button.Link>,
    ],
  })
})

app.frame('/chat', (c) => {
  const { buttonValue, inputText, status } = c

  return c.res({
    action: '/chat',
    image: (
      <div
        style={{
          alignItems: 'center',
          background:
            status === 'response'
              ? 'linear-gradient(to right, #432889, #17101F)'
              : 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
        }}
      >
       Logo goes Here

        <div
          style={{
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
          Therapy GPT
        </div>
        <div
          style={{
            color: 'white',
            fontSize: 48,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          Write to me
        </div>
        <div
          style={{
            color: 'white',
            fontSize: 48,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 30,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          - Talk To me
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Enter text..." />,
      <Button action='/submit' value="cluhggay2000zvkb4lycsiowo"> Send </Button>,
      <Button action='/' value="Go Back"> Go Back </Button>,
    ],
  })
})


app.frame('/submit', async (c) => {
  const { buttonValue, inputText, status } = c
  const inputValue = inputText
  const button = buttonValue
  let chatResult: any
 try {
    // @ts-ignore
    chatResult = await chatWithModel(inputValue, button)
  } catch (error) {
    chatResult = error
  }

  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background:
            status === 'response'
              ? 'linear-gradient(to right, #432889, #17101F)'
              : 'black',
          backgroundSize: '100% 100%',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          textAlign: 'center',
          width: '100%',
        }}
      >
      Logo goes Here

        <div
          style={{
            color: 'white',
            fontSize: 30,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            whiteSpace: 'pre-wrap',
          }}
        >
          {status === 'response'
            && `This is the answer for your question:`}
        </div>
        <div
          style={{
            color: 'white',
            fontSize: 48,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            marginTop: 10,
            whiteSpace: 'pre-wrap',
          }}
        >
          {status === 'response'
            && `${inputText}`}
        </div>
        <div
          style={{
            color: 'white',
            fontSize: 24,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 20,
            width: '70%',
            whiteSpace: 'pre-wrap',
          }}
        >
          {status === 'response'
            && `${chatResult?.answer}`}
        </div>
      </div>
    ),
    intents: [
      <Button action='/' value="Go Back"> Go Back </Button>,
      <Button.Link href="https://flock.io">FLock</Button.Link>,
      // <Button.Mint mint=""> Ask Another Question </Button.Mint>,
    ],
  })
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
