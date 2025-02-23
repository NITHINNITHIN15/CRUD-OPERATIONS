import React, { useEffect, useState } from "react";
import { db,addDoc, updateDoc, deleteDoc, doc } from './firebase';
import {collection,getDocs} from 'firebase/firestore';
import { Button, TextField, List, ListItem, ListItemText, IconButton, Typography, Container } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";

function FirestoreCRUD ()  {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editingId, setEditingId] = useState(null);

  const usersCollection = collection(db, "users");

  // Fetch users from Firestore
  const fetchUsers = async () => {
    const querySnapshot = await getDocs(usersCollection);
    const userData = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setUsers(userData);
  };

  useEffect(() => {
    fetchUsers();
  },);

  // Add or update user
  const handleSubmit = async () => {
    if (editingId) {
      const userDoc = doc(db, "users", editingId);
      await updateDoc(userDoc, { name, email });
      setEditingId(null);
    } else {
      await addDoc(usersCollection, { name, email });
    }
    setName("");
    setEmail("");
    fetchUsers();
  };

  // Edit user
  const handleEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setEditingId(user.id);
  };

  // Delete user
  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "users", id));
    fetchUsers();
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Firestore CRUD with React & MUI
      </Typography>

      <TextField fullWidth label="Name" value={name} onChange={(e) => setName(e.target.value)} margin="normal" />
      <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" />
     
      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }}>
        {editingId ? "Update User" : "Add User"}
      </Button>

      <List>
        {users.map((user) => (
          <ListItem key={user.id} secondaryAction={
            <>
              <IconButton onClick={() => handleEdit(user)} color="primary">
                <Edit />
              </IconButton>
              <IconButton onClick={() => handleDelete(user.id)} color="error">
                <Delete />
              </IconButton>
            </>
          }>
            <ListItemText primary={user.name} secondary={user.email} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default FirestoreCRUD;