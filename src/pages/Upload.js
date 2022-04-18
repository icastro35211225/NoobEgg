import React, { useState, useEffect } from "react";
import Axios from 'axios';
import '../App.css';
import './upload.css';


export default function UploadImage(props) {
    const [imageList, setImageList] = useState('');


    async function previewFile(){
        var preview = document.querySelector('#preview');
        const files = document.querySelector('input[type=file]').files;
        
        function readAndPreview(file){
            if(/\.(jpe?g|png)$/i.test(file.name)) {
                var reader = new FileReader();

                reader.addEventListener("load", function () {
                    var image = new Image();
                    image.height = 100;
                    image.title = file.name;
                    image.src = this.result;
                    preview.appendChild( image );
                }, false);
                reader.readAsDataURL(file);
            }
        }
        if(files){
            [].forEach.call(files, readAndPreview);  
        }
        setImageList(files);
        console.log(imageList);
        //console.log(files);
        
    }

    async function uploadFiles(){
        const data = new FormData();
        const file = document.querySelector('input[type=file]').files[0];
        data.append("file", file);
        Axios.post('http://ec2-3-93-234-9.compute-1.amazonaws.com:3000/api/upload', data)
            .then((res) => {
                console.log(res);
            });
    }


    return (
        <upload>
            <h2>Testing</h2>
                {/* <form action="/api/upload" method="POST" encType="multipart/form-data"> */}
                    <input name="files" type="file" onChange={() => previewFile()}/>
                    <div id="preview"></div>
                    <button type="submit" onClick={() => uploadFiles()}>Upload</button>
                {/* </form> */}
        </upload>
    )
}