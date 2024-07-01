import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notificationGroups: [],
  hasNewNotification: false,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      const { id, text } = action.payload;
      const timestamp = new Date().toLocaleString();
      const newNotification = { id, text, timestamp };

      const lastGroup = state.notificationGroups[state.notificationGroups.length - 1];
      if (lastGroup && lastGroup.length < 3) {
        state.notificationGroups = [...state.notificationGroups.slice(0, -1), [...lastGroup, newNotification]];
      } else {
        state.notificationGroups = [...state.notificationGroups, [newNotification]];
      }

      state.hasNewNotification = true;
    },
    removeNotification: (state, action) => {
      const id = action.payload;
      state.notificationGroups = state.notificationGroups.map(group => 
        group.filter(notification => notification.id !== id)
      ).filter(group => group.length > 0);

      state.hasNewNotification = state.notificationGroups.length > 0;
    },
  },
});

export const { setNotification, removeNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
