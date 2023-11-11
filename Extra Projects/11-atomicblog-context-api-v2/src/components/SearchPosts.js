import {usePost} from '../context/PostContext';

export function SearchPosts() {
    // Consume Context
    const {searchQuery, setSearchQuery} = usePost();
    return (
        <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts..."
        />
    );
}
