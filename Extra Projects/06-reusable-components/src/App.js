import './styles.css';
import TextExpander from './copmponents/TextExpander';
import StarRating from './copmponents/StarRating';

export default function App() {
    return (
        <div>
            <h1>Reusable Components</h1>
            <TextExpander collapsedNumWords={100} expanded={false}>
                Space missions have given us incredible insights into our
                universe and have inspired future generations to keep reaching
                for the stars. Space travel is a pretty cool thing to think
                about. Who knows what we'll discover next. Space missions have
                given us incredible insights into our universe and have inspired
                future generations to keep reaching for the stars. Space travel
                is a pretty cool thing to think about. Who knows what we'll
                discover next. Space missions have given us incredible insights
                into our universe and have inspired future generations to keep
                reaching for the stars. Space travel is a pretty cool thing to
                think about. Who knows what we'll discover next! Space missions
                have given us incredible insights into our universe and have
                inspired future generations to keep reaching for the stars.
                Space travel is a pretty cool thing to think about. Who knows
                what we'll discover next. Is a pretty cool thing to think about.
                Who knows what we'll discover next. Space missions have given us
                incredible insights into our universe and have inspired future
                generations to keep reaching for the stars. Space travel is a
                pretty cool thing to think about. Who knows what we'll discover
                next! Space missions have given us incredible insights into our
                universe and have inspired future generations to keep reaching
                for the stars. Space travel is a pretty cool thing to think
                about. Who knows what we'll discover next.
            </TextExpander>

            <StarRating
                maxRating={5}
                messages={['terrible', 'bad', 'okk', 'good', 'amazing']}
                defaultRating={3}
                size={40}
                color="blue"
            />
        </div>
    );
}
