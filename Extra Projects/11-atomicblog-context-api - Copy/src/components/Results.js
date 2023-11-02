import {useContext} from 'react';
import {PostContext} from '../Context';

export function Results() {
    // Consume Context
    const {posts} = useContext(PostContext);
    return <p>🚀 {posts.length} atomic posts found</p>;
}
