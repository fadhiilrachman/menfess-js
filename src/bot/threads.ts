/* eslint-disable */
import * as fs from 'fs/promises'
import TelegramBot from "node-telegram-bot-api"
import path from "path"
import { ThreadsAPI } from "threads-api"

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN!);
const chatID: string = process.env.TELEGRAM_CHAT_ID!;

const threadUsername: string = process.env.THREAD_USERNAME!;
const threadPassword: string = process.env.THREAD_PASSWORD!;

let deviceID: string = process.env.THREAD_DEVICE_ID || `android-${(Math.random() * 1e24).toString(36)}`
let tParams = {};

(async function () {
  const sessionPath = path.join(__dirname, "session.json")
  const sessionData = await fs.readFile(sessionPath)
  const tSession = JSON.parse(sessionData.toString())

  if (!tSession.threads_token && !tSession.threads_device_id) {
    tParams = {
      // verbose: true,
      username: threadUsername,
      password: threadPassword,
      deviceID: tSession.threads_device_id,
    }

    console.log(`login with password`)
  } else {
    tParams = {
      token: tSession.threads_token,
      username: threadUsername,
      deviceID: deviceID,
    }

    console.log(`login with token`)
  }

  const threadsAPI = new ThreadsAPI(tParams)

  const token = await threadsAPI.getToken()
  await fs.writeFile(sessionPath, JSON.stringify({threads_token: token, threads_device_id: deviceID}))

  async function postThread(
    text: string,
    randomWait = false
  ) {

    console.log("postThread", text)

    if (randomWait) {
      //wait for a random amount of time between 0 to 5 mins
      const randomWaitTime = Math.floor(Math.random() * 300)
      await new Promise((resolve) =>
        setTimeout(resolve, randomWaitTime * 1000)
      )
    }

    console.log("posting to thread...")

    const didPost = await threadsAPI.publish({
      text: text,
    });

    const msgText = `${didPost ? "Posted" : "ERROR: Could not post"}: ${text}`

    if (!didPost) {
      // reset token
      await fs.writeFile(sessionPath, JSON.stringify({}))
    }

    console.log("posted thread")

    await bot.sendMessage(chatID, msgText ?? "No message")

    return didPost
  }

  const didPostThread = await postThread(
    `Hmm..`
  )
  if (didPostThread) {
    console.log('posted!')
  }
})()