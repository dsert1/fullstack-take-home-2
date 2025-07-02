"use client"
import { v4 as uuid } from "uuid"
import { useState } from "react"
import { usePortfolio } from "../hooks/usePortfolio"
import { getPresignedPost, uploadToS3 } from "../lib/aws"

export default function FilePicker({ section }: { section: string }) {
  const [, dispatch] = usePortfolio()
  const [preview, setPreview] = useState<string | null>(null)

  async function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setPreview(URL.createObjectURL(file))
    const { key, presigned } = await getPresignedPost(file.name, file.type)
    const url = await uploadToS3(presigned, file)

    dispatch({
      type: "ADD_ITEM",
      section,
      item: {
        id: uuid(),
        type: file.type.startsWith("video") ? "video" : "image",
        s3Key: key,
        url,
        title: file.name,
        metadata: { size: file.size },
      },
    })
  }

  return (
    <div className="my-2">
      <input type="file" accept="image/*,video/*" onChange={onChange} />
      {preview && (
        <div className="mt-2">
          <img src={preview} alt="preview" className="h-24 object-cover" />
        </div>
      )}
    </div>
  )
}
