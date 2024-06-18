import 'antd/dist/reset.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Spin } from 'antd';
import pets from './pets.json';
import { api } from './common/http-common';
import axios from 'axios';
import { LoadingOutlined } from '@ant-design/icons';
import PostIcon from './posticon';
import Displaycomment from './comments';



const Pet = () => {
  const [pets, setPets] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    axios.get(`${api.uri}/pets`)
      .then((res) => {
        setPets(res.data);
        localStorage.setItem('a', JSON.stringify(res.data))
      })
      .then(() => {
        setLoading(false);
      })

  }, []);


  if (loading) {
    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />
    return (<Spin indicator={antIcon} />);
  } else {
    if (!pets) {
      return (<div>There is no pet available now.</div>)
    } else {


      return (<>
        <Row gutter={[16, 16]} style={{ marginLeft: "15px" }}>
          {
            pets && pets.map(({ id, title, imageurl, links }) => (
              <Col key={id}>
                <Card title={title} style={{ width: 300 }}
                  cover={<img alt="example" src={imageurl} />} hoverable
                  actions={[
                    <PostIcon type="like" countLink={links.likes} id={id} />,
                    <Displaycomment msgLink={links.msg} id={id} />,
                    <PostIcon type="heart" FavLink={links.fav} id={id} />

                  ]}
                >
                  <Link to={`/${id}`}>Details</Link>

                </Card>

              </Col>
            ))
          }
        </Row></>
      )
    }
  }
}


export default Pet;