import {createContext, useContext, useState} from 'react';
import {createRandomPost} from './App';

const PostContext = createContext();

function PostProvider({children}) {
    const [posts, setPosts] = useState(function () {
        return new Array(30).fill(null).map(function (ele) {
            return createRandomPost();
        });
    });

    const [searchQuery, setSearchQuery] = useState('');

    // Derived state. These are the posts that will actually be displayed
    const searchedPosts =
        searchQuery.length > 0
            ? posts.filter((post) =>
                  `${post.title} ${post.body}`
                      .toLowerCase()
                      .includes(searchQuery.toLowerCase())
              )
            : posts;

    function handleAddPost(post) {
        setPosts((posts) => [post, ...posts]);
    }

    function handleClearPosts() {
        setPosts([]);
    }

    return (
        <PostContext.Provider
            value={{
                posts: searchedPosts,
                onClearPosts: handleClearPosts,
                onAddPost: handleAddPost,
                searchQuery: searchQuery,
                setSearchQuery: setSearchQuery,
            }}
        >
            {children}
        </PostContext.Provider>
    );
}

function usePost() {
    const context = useContext(PostContext);
    if (context === undefined)
        throw new Error('Post Context used outside of the PostProvider');
    return context;
}

export {PostProvider, usePost};
