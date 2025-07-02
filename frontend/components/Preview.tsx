export default function Preview({ item }: { item: any }) {
  return item.type === "image" ? (
    <img src={item.url} alt={item.title} className="w-48 my-2" />
  ) : (
    <video src={item.url} className="w-48 my-2" controls />
  )
}
