import React,{useState,useEffect} from 'react';
import FileBase64 from 'react-file-base64';
import {db} from "../../../firebase/config"
import { Modal,Input } from 'antd';
  const { TextArea } = Input;

const UploadForm=()=> {
const [files, setfiles] = useState([])
const [pics, setpics] = useState([])
const [postTxt, setpostTxt] = useState(null)

  // Callback~
  function getFiles(data){
    setfiles(data)
    var imgs=[]
    data.map(pic=>{
      imgs.push(pic.base64)
    })
    setpics(imgs)
  }
  async function addPost (){
    console.log('data')
    var collection = db.collection('posts')
    var postData={
      images:pics,
      post_id:Math.floor(Date.now() / 1000),
      user_id:'usr1',//This can be dynamic of user that is logged in
      text:postTxt
    }
    collection.add(postData)
  }

    return (
        <>
      <FileBase64
        multiple={ true }
        onDone={getFiles } />
        <div className="form-group multi-preview">
        <TextArea onChange={(e)=>{setpostTxt(e.target.value)}} showCount maxLength={100} placeholder='Text goes here' />
                    {files && (files).map(url => (
                        <img style={{width: '80px', height: '80px'}} src={url.base64} alt="..." />
                    ))}
                </div>
        </>
    )
  }




export default UploadForm;


