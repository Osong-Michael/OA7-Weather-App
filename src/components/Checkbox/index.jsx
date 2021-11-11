import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Button, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { capitalizeFirstLetter } from '../helpers';
import { changeUnit } from '../Redux/actions';



const Checkbox = () => {
  const [value, setValue] = useState('celsius');
  const temps = ['celsius', 'fahrenheit'];
  const dispatch = useDispatch();

  const checkboxes = temps.map((temp, index) => <div key={index + 1}><FormControlLabel value={temp} control={<Radio />} label={capitalizeFirstLetter(temp)} /></div>)

  const handleClick = e => {
    setValue(e.target.value)
    dispatch(changeUnit(e.target.value))
  }


  return (
    <Container 
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'center',
        justifyContent: 'center',
      }}
      maxWidth="sm"
    >
      <RadioGroup row aria-label="temperature" name="controlled-radio-buttons-group" value={value} onChange={handleClick}>
        {checkboxes}
      </RadioGroup>
      <Button variant="contained" sx={{ ml: 5 }} className="margin-to-sm" onClick={() => window.location.reload(false)}>Refresh</Button>
    </Container>
  )
}

export default Checkbox;