import React, { useState, useEffect} from 'react'
 
import { useRouter } from 'next/navigation'
import { Container, Paper, Typography,TextField, Radio,  Grid, FormControl , FormLabel, RadioGroup,FormControlLabel, Button} from '@mui/material'
const CreateNote = () => {
    const router = useRouter() 
    const [title, setTitle] = useState('')
    const [category , setCategory] = useState('Todo')
    const [details, setDetails] = useState('')
    const [titleError, setTitleError] = useState(false)
    const [detailsError, setDetailsError] = useState(false)
    
    const handleSubmit = (e) =>{
        e.preventDefault();
        setDetailsError(false);
        setTitleError(false);
        if(title === '' ){
            setTitleError(true);
        }
        if(details === " "){
            setDetailsError(true);
        }
        if(title && details){
            fetch('http://localhost:8000/notes', {
            method: 'POST', 
            headers: { "content-type": "application/json"}, 
            body: JSON.stringify({title, details, category})
            }).then(()=>router.push('/'))
    } 
           /*  fetch('http://localhost:8000/notes', {
            method: 'POST', 
            headers: { "content-type": "application/json"}, 
            body: JSON.stringify({title, details, category})
            })  .then(()=>router.push('/')); */
        
        
    }
  return (
    <Container size="sm">
      <Typography
        variant="h6" 
        color="textSecondary"
        component="h2"
        gutterBottom
      >
        Create a New Note
      </Typography>
      
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField 
          onChange={(e) => setTitle(e.target.value)}
          label="Note Title" 
          variant="outlined" 
          color="secondary" 
          fullWidth
          required
          error={titleError}
        />
        <TextField 
          onChange={(e) => setDetails(e.target.value)}
          label="Details"
          variant="outlined"
          color="secondary"
          multiline
          rows={4}
          fullWidth
          required
          error={detailsError}
        />

        {/* <Radio value="hello" />
        <Radio value="goodbye" /> */}

        <FormControl fullWidth>
          <FormLabel>Note Category</FormLabel>
          <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
            <FormControlLabel value="money" control={<Radio />} label="Money" />
            <FormControlLabel value="todos" control={<Radio />} label="Todos" />
            <FormControlLabel value="reminders" control={<Radio />} label="Reminders" />
            <FormControlLabel value="work" control={<Radio />} label="Work" />
          </RadioGroup>
        </FormControl>

        <Button
          type="submit" 
          color="secondary" 
          variant="contained"
         >
          Submit
        </Button>
      </form>

      
    </Container>
  )
}

export default CreateNote