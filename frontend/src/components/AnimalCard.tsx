import * as React from 'react';

import { useMutation } from '@apollo/client';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import { DELETE_ANIMAL_MUTATION } from '../mutations/animal.mutations';
import { GET_ANIMALS_QUERY } from '../queries/animal.queries';
import { AnimalType } from '../types/animal.type';

interface Props {
  animal: AnimalType;
}

const AnimalCard:React.FC<Props> = ({ animal }) => {
  const [deleteAnimal] = useMutation(DELETE_ANIMAL_MUTATION);

  const handleDelete = () => {
    deleteAnimal({ variables: { id: animal.id }, refetchQueries: [GET_ANIMALS_QUERY] });
  };

  return (
    <Card sx={{ minWidth: 200, margin: 1 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={animal.imageURL}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {animal.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {animal.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="medium" color="info" variant='contained'>
          Share
        </Button>
        <Button onClick={handleDelete} size="medium" color="error" variant='contained'>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default AnimalCard;
