import {useContext} from 'react';
import {PostContext} from '../Context';

export function SearchPosts() {
    // Consume Context
    const {searchQuery, setSearchQuery} = useContext(PostContext);
    return (
        <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts..."
        />
    );
}
