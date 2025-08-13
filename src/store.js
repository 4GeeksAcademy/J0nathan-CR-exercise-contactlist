export const initialStore = () => ({
  message: null,
  contacts: [
    {
      id: crypto.randomUUID(),
      fullName: "Mike Anamendolla",
      address: "5842 Hillcrest Rd",
      phone: "(870) 288-4149",
      email: "mike.ana@example.com",
    },
  ],
});

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "add_contact": {
      return {
        ...store,
        contacts: [{ id: crypto.randomUUID(), ...action.payload }, ...store.contacts],
      };
    }

    case "update_contact": {
      const { id, data } = action.payload;
      return {
        ...store,
        contacts: store.contacts.map((c) => (c.id === id ? { ...c, ...data } : c)),
      };
    }

    case "delete_contact": {
      const { id } = action.payload;
      return {
        ...store,
        contacts: store.contacts.filter((c) => c.id !== id),
      };
    }

    default:
      throw Error("Unknown action type: " + action.type);
  }
}