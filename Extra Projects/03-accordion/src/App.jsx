import {useState} from 'react';
import './styles.css';

const faqs = [
    {
        title: 'Where are these chairs assembled?',
        text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.',
    },
    {
        title: 'How long do I have to return my chair?',
        text: 'Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.',
    },
    {
        title: 'Do you ship to countries outside the EU?',
        text: 'Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!',
    },
];

export default function App() {
    return (
        <div>
            <Accordion data={faqs} />
        </div>
    );
}

function Accordion({data}) {
    const [currOpen, setCurrOpen] = useState(null);

    function handleCurrOpen(num) {
        setCurrOpen(() => num);
    }

    return (
        <div className="accordion">
            {data.map((el, i) => (
                <AccordionItem
                    currOpen={currOpen}
                    onCurrOpen={handleCurrOpen}
                    key={i}
                    title={el.title}
                    num={i + 1}
                >
                    {el.text}
                </AccordionItem>
            ))}
        </div>
    );
}

function AccordionItem({currOpen, onCurrOpen, num, title, children}) {
    const isOpen = currOpen === num;

    function handleToggle() {
        onCurrOpen(isOpen ? null : num);
    }

    return (
        <div className={`item ${isOpen && 'open'}`} onClick={handleToggle}>
            <p className="number">{num < 9 ? `0${num}` : num}</p>
            <p className="title">{title}</p>
            <p className="icon">{isOpen ? '-' : '+'}</p>
            {isOpen && <div className="content-box">{children}</div>}
        </div>
    );
}
