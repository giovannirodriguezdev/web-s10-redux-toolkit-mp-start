// ✨ create your `quotesSlice` in this module
import { createSlice } from "@reduxjs/toolkit";

let id = 1;
const getNextId = () => id++;
const initialState = {
  displayAllQuotes: true,
  highlightedQuote: null,
  quotes: [
    {
      id: getNextId(),
      quoteText: "Don't cry because it's over, smile because it happened.",
      authorName: "Dr. Seuss",
      apocryphal: false,
    },
    {
      id: getNextId(),
      quoteText: "So many books, so little time.",
      authorName: "Frank Zappa",
      apocryphal: false,
    },
    {
      id: getNextId(),
      quoteText: "Be yourself; everyone else is already taken.",
      authorName: "Oscar Wilde",
      apocryphal: false,
    },
  ],
};

export const quotesSlice = createSlice({
  name: "quotes",
  initialState,
  reducers: {
    toggleVisibility: (state) => {
      state.displayAllQuotes = !state.displayAllQuotes;
    },
    deleteQuote: (state, action) => {
      const idToDelete = action.payload;
      state.quotes = state.quotes.filter((qt) => qt.id !== idToDelete);

      if (state.highlightedQuote === idToDelete) {
        state.highlightedQuote = null;
      }
    },
    editQuoteAuthenticity: (state, action) => {
      const idToEdit = action.payload;
      const quoteToEdit = state.quotes.find((qt) => qt.id === idToEdit);
      if (quoteToEdit) {
        quoteToEdit.apocryphal = !quoteToEdit.apocryphal;
      }
    },
    setHighlightedQuote: (state, action) => {
      const idToHighlight = action.payload;
      state.highlightedQuote =
        state.highlightedQuote === idToHighlight ? null : idToHighlight;
    },
    createQuote: {
      reducer: (state, action) => {
        state.quotes.push(action.payload);
      },
      prepare: (quoteText, authorName) => {
        const id = getNextId();
        return {
          payload: {
            id,
            quoteText,
            authorName,
            apocryphal: false,
          },
        };
      },
    },
  },
});

export const {
  toggleVisibility,
  deleteQuote,
  editQuoteAuthenticity,
  setHighlightedQuote,
  createQuote,
} = quotesSlice.actions;

export default quotesSlice.reducer;
