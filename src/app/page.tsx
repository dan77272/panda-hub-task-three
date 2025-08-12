'use client'

import axios from "axios";
import { useState } from "react";

interface Post{
  id: number;
  title: string;
}


export default function Home() {

const [posts, setPosts] = useState<Post[]>([])
const [post, setPost] = useState("")
const [loading, setLoading] = useState(false)

  async function fetchData(): Promise<Post[]>{
    const {data} = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
    return data
  }

  async function createPost(): Promise<Post>{
    const {data} = await axios.post<Post>('https://jsonplaceholder.typicode.com/posts', {
      id: posts.length + 1,
      title: post
    },
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return data
  }

  async function handleFetch(){
    const data = (await fetchData()).slice(0, 10)
    setPosts(data)
  }

  async function handlePost(){
    setLoading(true)
    const data = await createPost()
    const created = {...data, id: posts.length + 1}
    setPosts(prev => [...prev, created])
    setLoading(false)
    setPost("")
  }
  

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="flex gap-4">
        <button onClick={handleFetch} className="bg-blue-500 text-white px-2 py-1 rounded cursor-pointer">Fetch Data</button>
        <div className="space-x-5">
          <button onClick={handlePost} className={`bg-green-500 text-white px-2 py-1 rounded cursor-pointer ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={loading || !post}>Create Post</button>
          <input value={post} onChange={e => setPost(e.target.value)} placeholder="Enter title..." className="border p-1 rounded" />
        </div>
      </div>

      <ul>
        {posts.map((post : Post) => (
          <li key={post.id}>
            <p>{post.id} - {post.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
