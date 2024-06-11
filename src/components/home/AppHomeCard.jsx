import React from 'react';
import { Card } from 'antd';
import { useNavigate } from 'react-router-dom';

const CustomCard = ({ title, imageUrl, description, link }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(link);
  };

  return (
    <Card
      hoverable
      style={{ width: 205 }}
      cover={<img alt={title} src={imageUrl} />}
      onClick={handleCardClick}
    >
      <Card.Meta title={title} description={description} />
    </Card>
  );
}

export default CustomCard;
