import Image from 'next/image'
import styles from './page.module.css'
import { createApiClient, schemas } from '@/services/petstore-default'
import axios from 'axios'
import { ZodError, z } from 'zod'
import { UploadButton } from './UploadButton'

const petstoreClient = createApiClient("http://localhost:8080/api/v3")

async function getData() {
  try {
    const schema = z.custom<File | Buffer>((data) => {
      return typeof window === 'undefined' ? data instanceof Buffer : data instanceof File
    }, 'Data is not an instance of a Buffer or File')

    const image = await fetch(
      'https://upload.wikimedia.org/wikipedia/commons/5/50/Adobe_Illustrator_icon.png'
    )
    const blob = await image.blob()
    const arrayBuffer = await blob.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    schema.parse(buffer) as Buffer
    // schema.parse({}) // Fails

    // await petstoreClient.uploadFile(buffer, {
    //   params: {
    //     petId: 1
    //   }
    // })

    // const image = await fetch(
    //   'https://upload.wikimedia.org/wikipedia/commons/5/50/Adobe_Illustrator_icon.png'
    // )
    // return await petstoreClient.uploadFile(new File([await image.blob()], 'asdf'), {
    //   params: {
    //     petId: 3
    //   }
    // })

    return await petstoreClient.getPetById({ params: { petId: 1 } })
  } catch (error) {
    if (error instanceof ZodError) {
      console.error(error.stack)
    } else if (axios.isAxiosError(error)) {
      console.error(error.message + ": " + error.response?.data)
    }

    throw error
  }
}

// Shared state somewhere
type State = {
  data: Array<z.infer<typeof schemas.Pet>>
}

export default async function Home() {
  const data = await getData()

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <UploadButton />
        <p>
          ad{JSON.stringify(data, null, 2)}
        </p>
        <div>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore the Next.js 13 playground.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  )
}
