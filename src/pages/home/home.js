import React, {useState,useEffect} from 'react'
import { Button,Carousel,Card,Avatar, Tooltip, Spin, Result } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import Modal from '../../components/modalcontent/modalcontent'
import {db} from '../../firebase/config'
import './home.css'
import BackgroundPhoto from "../../Assets/Background-photo.jpg" 

const { Meta } = Card;

const Home = () => {
    const [isVisible,setVisible] = useState(false)
    const [posts,setposts]=useState([])
    const [users, setusers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const showModal = () => {
      setVisible(true);
      };
      
      useEffect(() => {
        fetchUsers();
        fetchPosts()
      }, [])

    const fetchUsers=async()=>{
      const response=db.collection('users');
      const data=await response.get();
      var usrData=[]
      data.docs.forEach(item=>{
        usrData.push(item.data())
        })
        setusers(usrData)
        setIsLoading(false)
    }

    const fetchPosts = async () =>{
      const response=db.collection('posts');
       const observer = response.onSnapshot(data => {
        var pstData=[]
        data.docs.forEach(item=>{
          pstData.push(item.data())
         })
         setposts(pstData.sort((a,b)=>a.post_id<b.post_id))
        // ...
      }, err => {
        console.log(`Encountered error: ${err}`);
      });
      
       
    }
    const renderPosts = () => {
      return posts.map((pst,i)=>{
       var postUsr=users.filter(a=>a.id==pst.user_id)[0]
        return  <Card
        hoverable
        cover={<Carousel >{pst.images.map((el,i)=>{
          return <img className='img-carousel' src={`${el}`}/>
        })}</Carousel>}
      >
        <Meta avatar={
              <Avatar src={postUsr.usrpic} />
            } title={`${postUsr.name} ${postUsr.surname}`} description={`${pst.text}`} />
      </Card>
        
      })
    }
 
    return (
        <div className='home-wrapper'>
        <img src={BackgroundPhoto} className='bcg-photo'></img>
        {/* {posts.length == 0 ?  
        <Result title="No post uploaded yet"
        extra={
          <Button type="primary" onClick={showModal}>Create post</Button>
        }
        /> 
       
        : 
        ( */}
          <Spin tip="Almost there..." size='large'  spinning={isLoading}>
        <div className='posts'>  
          {renderPosts()}
        </div> 
        </Spin>
        {/* )
        } */}
        <Tooltip title="Create post">
            <Button type="primary" shape="circle" icon={<PlusOutlined />} size='large' onClick={showModal}>
            </Button>
        </Tooltip>
        <Modal isVisible={isVisible} setVisible={setVisible}/>
        </div>
    )
}

export default Home;