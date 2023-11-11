import {usePost} from '../context/PostContext';

export function Results() {
    // Consume Context
    const {posts} = usePost();
    return <p>🚀 {posts.length} atomic posts found</p>;
}
