// import React, { useState, useEffect } from "react";
// import Axios from 'axios';
// import '../App.css';
// import './upload.css';


// export default function UploadImage(props) {
//     const [imageList, setImageList] = useState('');
//     const [previewFile, setPreviewFile] = useState('');
//     const [message, setMessage] = useState('');
//     const [path, setPath] = useState('');


//     async function show(){
//         const file = document.querySelector('input[type=file]').files;  
//         const url = URL.createObjectURL(new Blob(file));
//         setPreviewFile(url);
//     }

//     async function uploadFiles(){
//         const data = new FormData();
//         const file = document.querySelector('input[type=file]').files[0];
//         data.append("file", file);
//         Axios.post('http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/upload', data)
//             .then((res) => {
//                 if(res.statusText == "OK"){
//                     setMessage("Yay! Image Uploaded!");
//                     //console.log("mssg: " + message);
//                 } else {
//                    setMessage("OOF! Something went wrong");
//                 }
//                 setPath("http://ec2-3-93-234-9.compute-1.amazonaws.com:8888/" + res.data.filename);
//                 document.getElementById('message').hidden = false;
//                 console.log(res);
//             });
//     }

//     return (
//         <upload>
//             <h2>Testing</h2>
//                 {/* <form action="/api/upload" method="POST" encType="multipart/form-data"> */}
//                     <input name="files" type="file" onChange={show}/>
//                     <button type="submit" onClick={() => uploadFiles()}>Upload</button>
//                     <div>
//                         <img id="preview" src={previewFile}></img>
//                         <p id="message" hidden="none">{message}</p>
//                     </div>

//                     <img src={path}></img>
//                 {/* </form> */}
//         </upload>
//     )
// }