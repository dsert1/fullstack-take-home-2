export async function getPresignedPost(filename: string, contentType: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload/presign`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filename, contentType }),
  });
  if (!res.ok) throw new Error("presign failed");
  return res.json(); // { key, presigned }
}

export async function uploadToS3(presigned: any, file: File) {
  const formData = new FormData();
  Object.entries({ ...presigned.fields, file }).forEach(([k, v]) =>
    formData.append(k, v as string | Blob)
  );
  const resp = await fetch(presigned.url, { method: "POST", body: formData });
  if (!resp.ok) throw new Error("upload error");
  return `${presigned.url}/${presigned.fields.key}`;
}
