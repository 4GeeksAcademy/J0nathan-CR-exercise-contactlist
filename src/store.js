export const initialStore = () => ({
  message: null,
  contacts: [],
});

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "storeContact": {
      const { contacts, contact } = action.payload || {};
      if (Array.isArray(contacts)) {
        return { ...store, contacts };
      }
      if (contact) {
        return { ...store, contacts: [contact, ...store.contacts] };
      }
      return store;
    }
    case "storeEditContact": {
      const { contact } = action.payload || {};
      if (!contact) return store;
      return {
        ...store,
        contacts: store.contacts.map((c) => (c.id === contact.id ? contact : c)),
      };
    }
    case "storeDeleteContact": {
      const { id } = action.payload || {};
      if (!id) return store;
      return { ...store, contacts: store.contacts.filter((c) => c.id !== id) };
    }
    case "gotoEditContact": {
      return { ...store, editing: action.payload?.contact || null };
    }
    default:
      throw Error("Unknown action.");
  }
}
