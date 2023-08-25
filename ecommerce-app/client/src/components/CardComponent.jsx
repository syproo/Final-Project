import { Card, Space } from "antd";

const CardComponent = () => {
  return (
    <div>
      <Space direction="vertical" size={16}>
        <Card
          style={{
            width: 300,
          }}
          cover={
            <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            />
          }
        >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Space>
    </div>
  );
};

export default CardComponent;
