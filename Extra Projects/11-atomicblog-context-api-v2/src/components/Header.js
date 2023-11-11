import {Results} from './Results';
import {SearchPosts} from './SearchPosts';
import {usePost} from '../context/PostContext';

export function Header() {
    // Consume Context
    const {onClearPosts} = usePost();
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
