'use client';
import { createApiClient } from "@/services/petstore-default"
import { z } from "zod";

export function UploadButton() {
  return <button onClick={async () => {
    const schema = z.custom<File | Buffer>((data) => {
      return typeof window === 'undefined' ? data instanceof Buffer : data instanceof File
    }, 'Data is not an instance of a Buffer or File')

    const image = await fetch(
      'https://upload.wikimedia.org/wikipedia/commons/5/50/Adobe_Illustrator_icon.png'
    )
    const blob = await image.blob()
    const file = new File([blob], 'filename')

    schema.parse(file) as File
    // schema.parse({}) // Fails

    // const petstoreClient = createApiClient("http://localhost:8080/api/v3")
    // await petstoreClient.uploadFile(fileOrBuffer, {
    //   params: {
    //     petId: 1
    //   }
    // })
  }}>Upload</button>
}