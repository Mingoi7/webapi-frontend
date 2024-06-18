import 'antd/dist/reset.css';
import { Row, Col, Card } from 'antd';
import BriefPet from './BriefPet'

const Landing = () => {
  return (
    <>
      <Row gutter={[16, 16]} style={{ marginLeft: "15px" }}>
        <Col span={8}>
          <Card style={{ width: 300 }} cover={<img alt="example" src="img/OIP.jfif" />}
          >
            <h2>Europe cat </h2>
            <p>www.instagram.com </p>
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ width: 300 }} cover={<img alt="example" src="img/OIP (1).jfif" />}
          >
            <h2>Asia Dog </h2>
            <p>www.google.com </p>
          </Card>
        </Col>
        <Col span={8}>
          <Card style={{ width: 300 }} cover={<img alt="example" src="img/OIP (2).jfif" />}
          >
            <h2>China Cat </h2>
            <p>www.facebook.com </p>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Landing;