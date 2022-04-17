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
        console.log(files);
        
    }

    const uploadButton = () =>{
        for(var i = 0; i < imageList.length; i++){
            console.log(imageList[i]['name']);
        }
    }


    return (
        <upload>
            <h2>Testing</h2>
                {/* <form action="/upload" method="POST" encType="multipart/form-data"> */}
                    <input type="file" id="browse" onChange={() => previewFile()} multiple/>
                    <div id="preview"></div>
                    <button onClick={uploadButton}>Upload</button>
                {/* </form> */}
        </upload>
    )
}