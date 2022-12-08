// third-party
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// project import
import drawerReducers from './reducers';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

const store = configureStore({
    reducer: {
        drawer: drawerReducers,
    },
});

type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;

const useAppDispatch = () => useDispatch<AppDispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store, useAppDispatch, useAppSelector };

