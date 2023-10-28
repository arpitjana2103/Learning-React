import {useEffect, useState} from 'react';
export function useLocalStarageState(initialState, key) {
    const [value, setValue] = useState(function () {
        const stotedValue = JSON.parse(localStorage.getItem(key));
        return stotedValue || initialState;
    });

    useEffect(
        function () {
            localStorage.setItem('watched', JSON.stringify(value));
        },
        [value]
    );

    return [value, setValue];
}
