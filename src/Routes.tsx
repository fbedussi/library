import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes as Switch } from 'react-router-dom';

import { TDispatch } from './model/types';
import AddBookPage from './pages/AddBookPage';
import CameraPage from './pages/CameraPage';
import EditBookPage from './pages/EditBookPage';
import LoginPage from './pages/LoginPage';
import SearchPage from './pages/SearchPage';
import SettingsPage from './pages/SettingsPage';
import SingleBookPage from './pages/SingleBookPage';
import ViewAllPage from './pages/ViewAllPage';
import { selectUserId } from './store/auth/selectors';
import booksActions from './store/books/actions';

const Routes = () => {
  const dispatch: TDispatch = useDispatch();

  useEffect(() => {
    dispatch(booksActions.load());
  }, [dispatch]);

  const userId = useSelector(selectUserId);

  return (
    <BrowserRouter>
      {!userId ? (
        <LoginPage />
      ) : (
        <Switch>
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/add" element={<AddBookPage />} />
          <Route path="/view-all" element={<ViewAllPage />} />
          <Route path="/book/:bookId" element={<SingleBookPage />} />
          <Route path="/camera" element={<CameraPage />} />
          <Route path="/edit/:bookId" element={<EditBookPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/" element={<SearchPage />} />
        </Switch>
      )}
    </BrowserRouter>
  );
};

export default Routes;
