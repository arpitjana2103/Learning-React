import {useContext} from 'react';
import {PostContext} from '../PostContext';

export function Results() {
    // Consume Context
    const {posts} = useContext(PostContext);
    return <p>🚀 {posts.length} atomic posts found</p>;
}
