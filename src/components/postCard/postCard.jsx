import { Link } from 'react-router-dom';

/* eslint-disable react/prop-types */
function PostCard({ post }) {
  return (
    <li key={post.id} className="flex flex-col justify-between max-w-sm p-6 bg-white border border-slate-200 rounded-lg shadow-md hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700">
    <div className="mb-6">
      <svg className="w-8 h-8 text-slate-400 dark:text-slate-600 mx-auto mb-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
        <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"/>
      </svg>
      <p className="w-full break-words text-xl font-semibold text-slate-900 dark:text-white">{post.attributes?.text}</p>
    </div>
    <figcaption className="flex items-center justify-between">
      <cite className="font-medium text-slate-500 dark:text-slate-400">by <Link to={`/profile/${post.attributes?.user.data?.id}`} className="text-blue-600 hover:underline dark:text-blue-500">
      {post.attributes?.user.data?.attributes?.username}
    </Link></cite>
      <span className="text-slate-500 dark:text-slate-400">
        {
          new Date(post.attributes?.createdAt).toLocaleString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          })
        }
      </span>

      <button type="button" className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:focus:ring-blue-800 dark:hover:bg-blue-500">
        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
          <path d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z"/>
        </svg>
        <span className="sr-only">Like post</span>
      </button>
    </figcaption>
  </li>

  )
}

export default PostCard;