//import React from 'react';

const About = () => {
  // Let's clear the local storage here
  //localStorage.clear();
  return (<><p></p>
  <h2 style={{color:"#135200",marginLeft:"25px"}}><strong>About our Pet shelter</strong></h2>
  <h4>我們是慈善機構“犬類收容所”，負責為收容所的狗與新主人進行匹配，並安排參觀收容所地點與狗見面。我們在城市的多個地區設有辦事處，每個辦事處都會有一名工作人員使用該應用程式輸入和管理其實際站點中當前可用狗的詳細資訊。</h4>
  <img style={{width:"900px"}}
              src="img/shelters.jpeg"
              alt="shelter-img"
              className="profile-img-card"
            />
</>)
}

export default About;