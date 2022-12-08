// types
import { createSlice } from '@reduxjs/toolkit';

// initial state

interface MenuState {
    openItem: String[];
    openComponent: string;
    drawerOpen: boolean;
    componentDrawerOpen: boolean;
}

const initialState: MenuState = {
    openItem: ['dashboard'],
    openComponent: 'buttons',
    drawerOpen: false,
    componentDrawerOpen: true,
};

// ==============================|| SLICE - MENU ||============================== //

const menu = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        activeItem(state, action) {
            state.openItem = action.payload.openItem;
        },

        activeComponent(state, action) {
            state.openComponent = action.payload.openComponent;
        },

        openDrawer(state, action) {
            state.drawerOpen = action.payload.drawerOpen;
        },

        openComponentDrawer(state, action) {
            state.componentDrawerOpen = action.payload.componentDrawerOpen;
        }
    }
});

export default menu.reducer;

export const { activeItem, activeComponent, openDrawer, openComponentDrawer } = menu.actions;
