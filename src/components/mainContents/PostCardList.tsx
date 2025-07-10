'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import type { Posts } from '@/types/post'
import PostCard, { type PostCardProps } from './PostCard'

type Props = {
  posts: Posts[]
  hasMore: boolean
}

const PostCardList: React.FC<Props> = (props) => {
  const { posts, hasMore } = props
  const router = useRouter()
  const page = useSearchParams()?.get('page')

  return (
    <div>
      {posts.map((post) => {
        return (
          <Link key={post.slug} href={`/posts/${post.slug}`}>
            <PostCard {...(post.metaData as PostCardProps)} />
          </Link>
        )
      })}
      <div className="flex justify-center items-center gap-6 mt-12 mb-8">
        {parseInt(page ?? '0') > 0 && (
          <button
            type="button"
            onClick={() => router.push(`/?page=${parseInt(page ?? '0') - 1}`)}
            className="group flex items-center justify-center w-10 h-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:-translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {parseInt(page ?? '0') + 1} ページ目
          </span>
        </div>

        {hasMore && (
          <button
            type="button"
            onClick={() => router.push(`/?page=${parseInt(page ?? '0') + 1}`)}
            className="group flex items-center justify-center w-10 h-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
export default PostCardList
