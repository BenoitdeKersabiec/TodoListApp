import * as React from 'react';

export const navigationRef = React.createRef();
import { DrawerActions } from "@react-navigation/native"

export function navigate(name, setCurrentScreen, params) {
    setCurrentScreen(name)
    navigationRef.current?.navigate(name, params);
}

export function openDrawer() {
    navigationRef.current?.dispatch(DrawerActions.openDrawer());
}

export function closeDrawer() {
    navigationRef.current?.dispatch(DrawerActions.closeDrawer());
}
