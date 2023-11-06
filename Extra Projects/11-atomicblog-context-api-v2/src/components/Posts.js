import {List} from './List';
import {usePost} from '../PostProvider';

export function Posts() {
    const {posts} = usePost();
    return (
        <section>
            <List posts={posts} />
        </section>
    );
}
