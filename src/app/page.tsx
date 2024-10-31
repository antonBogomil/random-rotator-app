'use client';

import { Button, Chip, Paper, Stack, TextField } from '@mui/material';
import React, { FormEvent, useState } from 'react';
import { Delete } from '@mui/icons-material';
import { Circle } from '@/components/Circle';
import { MAX_LENGTH } from '@/constants';


const mockData = [
  'John Doe',
  'Alice',
  'Bob',
  'Charlie',
  'David',
];

export default function Home() {
  const [input, setInput] = useState('');
  const [list, setList] = useState<string[]>(mockData);


  const handleRemove = (index: number) => () => {
    setList(list.filter((_, i) => i !== index));
  };

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    if (input && !list.includes(input) && list.length <= MAX_LENGTH) {
      setList([...list, input]);
      setInput('');
    } else {
      alert('Invalid input');
    }
  };

  return (
    <div className="text-center px-10">
      <form
        onSubmit={handleAdd}
        className="flex gap-4 my-2"
      >
        <TextField
          className="flex-grow"
          value={input}
          onChange={(e) => setInput(e.currentTarget.value)}
          variant="standard"
          label="Name"
        />
        <Button
          variant="contained"
          size="large"
          color="primary"
          className="w-1/3"
          type="submit"
        >
          Add
        </Button>
      </form>
      {list.length > 0 && (
        <Paper className="my-4 p-2">
          <Stack direction="row" spacing={1}>
            {list.map((name, i) => (
              <Chip
                key={name}
                label={name}
                onDelete={handleRemove(i)}
                deleteIcon={<Delete />}
              >
              </Chip>
            ))}
          </Stack>
        </Paper>
      )}

      {list.length > 1 && <Circle data={list} />}
    </div>
  );
}
