import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react";

interface Post {
    id: number;
    title: string;
    content: string;
  }

const Posts = () => {
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')

    const queryClient = useQueryClient()
    const {data: posts, isPending, isError, error} = useQuery<Post[]>({
        queryFn: async () => fetch('http://localhost:3000/posts').then(res => res.json()),
        queryKey: ['posts']
    })

    const createPostMutation = useMutation({
        mutationFn: async (newPost: Post) => {
            fetch('http://localhost:3000/posts', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(newPost)
            }).then(res => res.json())
            
        },
        onMutate: () => {

        },
        onSettled:() => {
            
        },
        onSuccess:() => {
            queryClient.invalidateQueries({
                queryKey: ['posts']
            })
        
            
        }
    
    })

    const handleCreatePost = () => {
        createPostMutation.mutate({id: posts?.length || 0, title, content})
    }

    if (isPending){
        return <div>loading....</div>
    }
     if (isError) { <div>{error.message}</div>}
  return (
    <>
    <div>
        <input type="text" placeholder="title" value={title} name="Title" onChange={e => setTitle(e.target.value)} />
        <input type="text" placeholder="content" value={content} name="Content" onChange={e => setContent(e.target.value)} />
        <button onClick={handleCreatePost}>Add new Post</button>
        <ul>
            {posts?.map(post => (
                <li key={post.id}>
                    <h2>{post.title}</h2>
                    <p>{post.content}</p>
                </li>
            ))}
        </ul>
    </div>
    </>
  )
}

export default Posts