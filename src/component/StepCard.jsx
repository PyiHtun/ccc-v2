import React from "react";
import { Card, Badge } from "antd";

const { Meta } = Card;

const StepCard = ({ step, title, description, imageSrc, onClick }) => (
  <Badge.Ribbon text={step}>
    <Card
      className="step-card"
      hoverable
      onClick={onClick}
      cover={<img alt={title} src={imageSrc} />}
      style={{ borderRadius: "10px", overflow: "hidden" }}
    >
      <Meta title={title} description={description} />
    </Card>
  </Badge.Ribbon>
);

export default StepCard;
