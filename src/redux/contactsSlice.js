import { createSlice } from '@reduxjs/toolkit';
// import { nanoid } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from 'redux/operations';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  extraReducers: builder => {
    builder.addCase(fetchContacts.pending, handlePending);
    builder.addCase(fetchContacts.fulfilled, (state, action) => {
      resetState(state);
      state.items = action.payload;
    });
    builder.addCase(fetchContacts.rejected, handleRejected);

    builder.addCase(addContact.pending, handlePending);
    builder.addCase(addContact.fulfilled, (state, action) => {
      resetState(state);
      state.items.push(action.payload);
    });
    builder.addCase(addContact.rejected, handleRejected);

    builder.addCase(deleteContact.pending, state => {
      state.isLoading = false;
    });
    builder.addCase(deleteContact.fulfilled, (state, action) => {
      resetState(state);
      const index = state.items.findIndex(
        contact => contact.id === action.payload.id
      );
      state.items.splice(index, 1);
    });
    builder.addCase(deleteContact.rejected, handleRejected);
  },
});

const handlePending = state => {
  state.isLoading = true;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};
const resetState = state => {
  state.isLoading = false;
  state.error = null;
};
export default contactsSlice.reducer;
// reducers: {
//   addContact: {
//     reducer(state, action) {
//       state.items.push(action.payload);
//     },
//     prepare(name, tel) {
//       return {
//         payload: {
//           id: nanoid(),
//           name,
//           tel,
//         },
//       };
//     },
//   },
//   deleteContact(state, action) {
//     const index = state.items.findIndex(
//       contact => contact.id === action.payload.id
//     );
//     state.items.splice(index, 1);
//   },
// },

// export const { addContact, deleteContact } = contactsSlice.actions;
