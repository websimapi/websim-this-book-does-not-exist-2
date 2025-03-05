// Manage book data storage and retrieval

export const saveBook = async (room, bookData) => {
  try {
    return await room.collection('book').create(bookData);
  } catch (error) {
    console.error("Error saving book:", error);
    throw error;
  }
};

export const getBooks = () => {
  // This function is not needed directly since we're using subscribe in the component
  // But kept for future use if needed
  try {
    return room.collection('book').getList();
  } catch (error) {
    console.error("Error getting books:", error);
    return [];
  }
};

