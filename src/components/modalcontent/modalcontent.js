import React, {useState} from 'react'
import { Modal,Input, message, } from 'antd';
import FileBase64 from 'react-file-base64';
import {db} from "../../firebase/config"
import './modalcontent.css'

const ModalContent = ({isVisible, setVisible}) => {
  const { TextArea } = Input;
  const [files, setfiles] = useState([])
  const [pics, setpics] = useState([])
  const [postTxt, setpostTxt] = useState(null)

  const success = () => {
    message.success('Post has been created');
  };

  // Callback~
  function getFiles(data){
    setfiles(data)
    var imgs=[]
    data.map(pic=>{
      imgs.push(pic.base64)
    })
    setpics(imgs)
  }
  const addPost =()=>{
    var collection = db.collection('posts')
    var postData={
      images:pics,
      post_id:Date.now(),
      user_id:'usr1', //This can be dynamic of user that is logged in
      text:postTxt
    }
    collection.add(postData)
    success()
  }

  const handleOk = () => {
    setVisible(false);
    setfiles([])
    setpics([])
    setpostTxt(null)
    addPost()
  };

  const handleCancel = () => {
    setVisible(false);
    setfiles([])
  };
    return (
       <Modal title='Create Post' okText='Create' visible={isVisible} onOk={handleOk} onCancel={handleCancel} closable={false}>
        <label className="file-upload">
       <FileBase64
        multiple={ true }
        onDone={getFiles } /> Choose photos
        </label>
     
       
        <div className="multi-photo-preview">
        {files && (files).map(url => (
                        <img className="image-priview" src={url.base64} alt="..." />
                    ))}</div>
      <TextArea onChange={(e)=>{setpostTxt(e.target.value)}} value={postTxt} showCount maxLength={100} placeholder='Enter a description' />   
      </Modal>
    )
}

export default ModalContent;