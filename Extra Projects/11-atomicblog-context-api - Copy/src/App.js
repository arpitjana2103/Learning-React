import {useEffect, useState} from 'react';
import {faker} from '@faker-js/faker';
import {Header} from './components/Header';
import {Main} from './components/Main';
import {Archive} from './components/Archive';
import {Footer} from './components/Footer';
import {PostProvider} from './PostContext';

export function createRandomPost() {
    return {
        title: `${faker.hacker.adjective()} ${faker.hacker.noun()}`,
        body: faker.hacker.phrase(),
    };
}

function App() {
    // Whenever `isFakeDark` changes, we toggle the `fake-dark-mode` class on the HTML element (see in "Elements" dev tool).
    const [isFakeDark, setIsFakeDark] = useState(false);

    useEffect(
        function () {
            document.documentElement.classList.toggle('fake-dark-mode');
        },
        [isFakeDark]
    );

    return (
        // 2) Provide Value to the Child Components
        <PostProvider>
            <section>
                <button
                    onClick={() => setIsFakeDark((isFakeDark) => !isFakeDark)}
                    className="btn-fake-dark-mode"
                >
                    {isFakeDark ? '☀️' : '🌙'}
                </button>

                <Header />
                <Main />
                <Archive />
                <Footer />
            </section>
        </PostProvider>
    );
}

export default App;
