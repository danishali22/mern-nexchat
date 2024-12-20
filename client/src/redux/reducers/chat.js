import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notificationCount: 0,
    newMessageAlert: [
        {
            chatId: "",
            count: 0,
        }
    ]
}


const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        incrementNotification: (state) => {
            state.notificationCount += 1;
        },

        resetNotifications: (state) => {
            state.notificationCount = 0;
        },

        setNewMessageAlert: (state, action) => {
            let chatId = action.payload.chatId;

            let index = state.newMessageAlert.findIndex(
                (item) => item.chatId === chatId,
            )

            if(index !== -1){
                state.newMessageAlert[index].count += 1;
            }
            else {
                state.newMessageAlert.push({
                    chatId,
                    count: 1,
                });
            }
        },

        removeNewMessageAlert: (state, action) => {
            state.newMessageAlert = state.newMessageAlert.filter(
                (item) => item.chatId !== action.payload
            );
        }
    }
});

export default chatSlice;
export const {
  incrementNotification,
  resetNotifications,
  setNewMessageAlert,
  removeNewMessageAlert,
} = chatSlice.actions;