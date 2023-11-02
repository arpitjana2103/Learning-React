import {List} from './List';
import {usePost} from '../PostContext';

export function Posts() {
    const {posts} = usePost();
    return (
        <section>
            <List posts={posts} />
        </section>
    );
}
