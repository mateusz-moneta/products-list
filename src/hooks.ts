import { Store, ThunkDispatch, UnknownAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from './store';

export type AppThunkDispatch = ThunkDispatch<RootState, any, UnknownAction>;

export const useAppDispatch = () => useDispatch<AppThunkDispatch>();

export const useAppSelector = useSelector.withTypes<RootState>();

export type AppStore = Omit<Store<RootState, UnknownAction>, 'dispatch'> & {
  dispatch: AppThunkDispatch;
};
