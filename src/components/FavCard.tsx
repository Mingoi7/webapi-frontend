import 'antd/dist/reset.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Spin } from 'antd';
import { api } from './common/http-common';
import axios from 'axios';
import { LoadingOutlined, CloseSquareOutlined, CloseSquareFilled } from '@ant-design/icons';
import PostIcon from './posticon';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import Displaycomment from './comments';
import pets from './pets.json';


const FavCard = (props: any) => {
  const [pet, setPet] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [theme, setTheme] = React.useState('outlined');
  const navigate: NavigateFunction = useNavigate();
  let origin: any = localStorage.getItem('a')


  React.useEffect(() => {

    // console.log(`path ${api.uri}/pet/fav`)  
    //console.log (`atoken ,Basic ${localStorage.getItem('aToken')}`)         
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `${api.uri}/pets/fav`,
      headers: {
        'Authorization': `Basic ${localStorage.getItem('aToken')}`
      }
    };

    axios.request(config)
      .then((results) => {
        //console.log(`path ${api.uri}/pets/fav`) 
        //console.log('results.data ', JSON.stringify(results.data))
        //console.log('filterting....')
        let filterPet = filterPets(results.data, JSON.parse(origin))
        console.log("filterPet ", filterPet)
        setPet(filterPet)

      })
      .then(() => {
        setLoading(false);
      })
  }, [])


  console.log('after filter pet ', pet)

  function getIcon(theme: string) {
    let Icon;

    if (theme === 'filled')
      Icon = CloseSquareFilled
    else
      Icon = CloseSquareOutlined
    return Icon;
  }



  function filterPets(filterarray: any[], originarray: any[]) {
    let resArr: any = [];

    //  console.log("filterarray.length  ",filterarray.length)
    //  console.log("originarray.length  ",originarray.length)
    for (let i = 0; i < filterarray.length; i++)
      for (let j = 0; j < originarray.length; j++) {
        console.log("petid,originarray", filterarray[i].petid, originarray[j].id)
        if (filterarray[i].petid == originarray[j].id) {
          resArr.push(originarray[j])
          break
        }
      }
    return resArr
  }

  const handleDelete = (fav: any) => {

    setTheme('filled')
    // console.log('fav link arr ', fav.links.fav)
    // console.log('fav link ', fav)
    axios.delete(fav.links.fav, {

      headers: {
        "Authorization": `Basic ${localStorage.getItem('aToken')}`
      }
    }
    )
      .then((results) => {
        console.log('respone ', JSON.stringify(results.data.message))
        if (results.data.message === "removed") {
          alert("This pet is removed from your favorite list")
          navigate("/favpage");
          window.location.reload();
        }

      })
      .catch((err) => {
        console.log(`Check network problems pls. `);
        alert("Check network problems");
      })
  }


  if (loading) {
    const antIcon = <LoadingOutlined style={{ fontSize: 48 }} spin />
    return (<Spin indicator={antIcon} />);
  } else {
    if (!pet) {
      return (<div>There is no pet available now.</div>)
    } else {


      const Icon = getIcon(theme)
      return (<>

        <Row gutter={[16, 16]} style={{ marginLeft: "15px" }}>
          {
            pet && pet.map(({ id, title, imageurl, links }) => (
              <Col key={id}>
                <Card title={title} style={{ width: 300 }}
                  cover={<img alt="example" src={imageurl} />} hoverable
                  actions={[
                    <PostIcon type="like" countLink={links.likes} id={id} />,
                    <Displaycomment msgLink={links.msg} id={id} />,
                    <PostIcon type="heart" FavLink={links.fav} id={id} />,
                    <Icon onClick={() => handleDelete({ links })} />
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


export default FavCard;