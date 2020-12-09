import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name, setCurrentScreen, params) {
    setCurrentScreen(name)
    navigationRef.current?.navigate(name, params);
}
