import { CardActionArea } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '../../hooks/useStore';
import StyledCard from './style';

export default function CustomCard({ result }) {
  const navigate = useNavigate();
  const updateProduct = useProductStore((state) => state.updateProduct);
  return (
    <StyledCard>
      <CardActionArea
        onClick={() => {
          updateProduct(result);
          navigate('/productinfo');
        }}
      >
        <CardMedia
          component="img"
          height="342px"
          image={result.photoUrl}
          alt=""
        />
        <Typography variant="h6" marginTop="15px" lineHeight={'23.5px'}>
          {result.title}
        </Typography>
      </CardActionArea>
      <Typography variant="h4SemiBold" marginTop="8px" color="#D10070">
        {`${result.price.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}`}
      </Typography>
    </StyledCard>
  );
}
