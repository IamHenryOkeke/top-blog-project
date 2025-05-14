export default function CommentCard({ comment }: { comment: { id: string, name: string, content: string, createdAt: string } }) {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">{comment.name}</h3>
      <p className="text-gray-600">{comment.content}</p>
      <p className="text-sm text-gray-500">{new Date(comment.createdAt).toDateString()}</p>
    </div>
  )
}
