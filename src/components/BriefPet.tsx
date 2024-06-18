import 'antd/dist/reset.css';
import { Card} from 'antd';

const { Meta } = Card;

const BriefPet = () => {
  return (
    <>
      <Card style={{width: 300}} cover={<img alt="example" src="img/OIP.jfif" />}
  >
        <h2>Europe Street beat </h2>
        <p>www.instagram.com </p>
      </Card>
    </>
  )
}

export default BriefPet;