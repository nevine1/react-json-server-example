"use client"
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Container, Grid, Paper } from '@mui/material'
import CreateNote from '@/components/notes/CreateNote'


export default function Home() {
 
  const [notes, setNotes] = useState([])
  useEffect(() =>{
    fetch('http://localhost:8000/notes')
    .then((res) =>res.json())
    .then(data =>setNotes(data));
  }, []);
//delete an item from the json server 

const handleDelete = async (id) => {
  await fetch('http://localhost:8000/notes/' + id, {
    method: 'DELETE'
  })
  const newNotes = notes.filter(note => note.id != id)
  setNotes(newNotes)
}
  return (
      <Container style={{margin: '40px auto'}}>
        <Grid container spacing={3}>
          {
            notes.map((note, index) =>(
              <Grid item sm={12} md={4} key={index}
                style={{
                  padding: '30px', 
                  backgroundColor: 'lightgrey', 
                  margin: '20px ',
                  border: '1px solid red'
                }}
              >
                <h4  >{note.title} </h4>
                <button type="button" onClick={handleDelete}>delete</button>
              </Grid>
            ))
          }
        </Grid>
        <hr/>
        <CreateNote/>
      </Container>

  )
}
