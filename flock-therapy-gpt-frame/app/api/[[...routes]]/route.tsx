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
  Conversation: []
}
 
const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  ui: { vars },
  initialState: {
    conversation: []
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
    >Flock Therapy GPT</span>

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

<Image objectFit="cover" height="128" borderRadius="20" src='/huggerlogo.jpg' />
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
    >Get Quick Therapy Sessions with Flock Therapy GPT click on start to proceed 👇👇👇</span>


   </div>
    

   </div>

   
        
     

      

         
        </>
    ),
    intents: [
      <Button action='/chat' value="Start">Start</Button>,
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
              ? 'linear-gradient(to right, #17101F)'
              : 'black',
          display: 'flex',
          flexDirection: 'column',
          flexWrap: 'nowrap',
          height: '100%',
          justifyContent: 'center',
          textAlign: 'center',
          width: '100%',
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
          Talk To me 🗣️
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
  const { buttonValue, inputText, status, deriveState } = c
  const inputValue = inputText
  const button = buttonValue
  let chatResult: any

 try {
    // @ts-ignore
    chatResult = await chatWithModel(inputValue, button)
  } catch (error) {
    chatResult = error
  }

  const state: any = deriveState((previousState: any): any => {
    if (inputValue) {
      return {
        conversation: [
          ...previousState.conversation,
          { input: inputText, output: chatResult.answer },
        ],
      };
    }
  });

  console.log('stateXXX:  ', state, console.log(inputText) )

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

        

        <div
          style={{
            color: 'white',
            fontSize: 28,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            marginTop: 10,
            whiteSpace: 'pre-wrap',
          }}
        >
          {status === 'response'
            && `You: ${inputText}`
              
            }
            

        </div>


        <div
          style={{
            color: 'white',
            fontSize: 28,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            marginTop: 20,
            width: '70%',
            whiteSpace: 'pre-wrap',
          }}
        >
          {status === 'response'
            &&               
              `TherapyGPT: ${chatResult?.answer}`}
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
