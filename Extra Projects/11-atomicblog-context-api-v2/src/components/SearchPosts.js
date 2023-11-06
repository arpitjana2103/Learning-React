import {usePost} from '../PostProvider';

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
