<template>
  <div>
    <h2>Book List</h2>
    <ul>
      <li v-for="book in books" :key="book.id">
        <template v-if="editId === book.id">
          <input v-model="editIsbn" placeholder="ISBN" />
          <input v-model="editName" placeholder="Name" />
          <button @click="updateBook(book.id)">Save</button>
          <button @click="cancelEdit">Cancel</button>
        </template>
        <template v-else>
          <strong>ISBN:</strong> {{ book.isbn }} | <strong>Name:</strong> {{ book.name }}
          <button @click="startEdit(book)">Edit</button>
          <button @click="deleteBook(book.id)">Delete</button>
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import db from '../firebase/init.js';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, where, orderBy, limit } from 'firebase/firestore';

export default {
  setup() {
    const books = ref([]);
    const editId = ref(null);
    const editIsbn = ref('');
    const editName = ref('');

    // Support where、orderBy、limit queries
    const fetchBooks = async () => {
      try {
        // Example: Order by name ascending, limit to 10
        const q = query(
          collection(db, 'books'),
          // where('isbn', '>=', 1000000000), 
          orderBy('name', 'asc'),
          limit(3)
        );
        const querySnapshot = await getDocs(q);
        books.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    const startEdit = (book) => {
      editId.value = book.id;
      editIsbn.value = book.isbn;
      editName.value = book.name;
    };

    const cancelEdit = () => {
      editId.value = null;
      editIsbn.value = '';
      editName.value = '';
    };

    const updateBook = async (id) => {
      try {
        await updateDoc(doc(db, 'books', id), {
          isbn: editIsbn.value,
          name: editName.value
        });
        await fetchBooks();
        cancelEdit();
        alert('Book updated!');
      } catch (error) {
        console.error('Error updating book:', error);
      }
    };

    const deleteBook = async (id) => {
      try {
        await deleteDoc(doc(db, 'books', id));
        await fetchBooks();
        alert('Book deleted!');
      } catch (error) {
        console.error('Error deleting book:', error);
      }
    };

    onMounted(fetchBooks);

    return {
      books,
      editId,
      editIsbn,
      editName,
      startEdit,
      cancelEdit,
      updateBook,
      deleteBook
    };
  }
};
</script>
