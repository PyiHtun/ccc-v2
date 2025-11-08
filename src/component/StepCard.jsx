import React from "react";
import { Card, Badge } from "antd";
import touchIcon from "../img/touch-32.png";

const { Meta } = Card;

const StepCard = ({ step, title, description, imageSrc, onClick }) => (
  <Badge.Ribbon text={step}>
    <Card
      hoverable
      onClick={onClick}
      cover={<img alt={title} src={imageSrc} />}
    >
      <Meta title={title} description={description} />
    </Card>
  </Badge.Ribbon>
);

export default StepCard;
