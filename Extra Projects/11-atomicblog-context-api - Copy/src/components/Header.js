import {useContext} from 'react';
import {Results} from './Results';
import {SearchPosts} from './SearchPosts';
import {PostContext} from '../PostContext';

export function Header() {
    // Consume Context
    const {onClearPosts} = useContext(PostContext);
    return (
        <header>
            <h1>
                <span>⚛️</span>The Atomic Blog
            </h1>
            <div>
                <Results />
                <SearchPosts />
                <button onClick={onClearPosts}>Clear posts</button>
            </div>
        </header>
    );
}
