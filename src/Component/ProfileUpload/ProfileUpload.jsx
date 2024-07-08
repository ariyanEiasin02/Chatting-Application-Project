import React, { createRef, useState } from 'react'
import person from '../../assets/person.jpg'
import { Link, useNavigate } from 'react-router-dom'
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getAuth, updateProfile } from "firebase/auth";
import { getDatabase, ref as refs, child, push, update } from "firebase/database";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { useSelector } from 'react-redux';
import { Rings } from 'react-loader-spinner'

const ProfileUpload = () => {
    const auth = getAuth();
    const db = getDatabase();
    const navigate = useNavigate()
    const storage = getStorage();
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState();
    const [cropData, setCropData] = useState("");
    const cropperRef = createRef();
    const data = useSelector(state => state.userLogin.userInfo)
    const handleUpload = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
            files = e.dataTransfer.files;
        } else if (e.target) {
            files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
    };

    const getCropData = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
            setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());

            const storageRef = ref(storage, auth.currentUser.uid);
            const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
            uploadString(storageRef, message4, 'data_url').then((snapshot) => {
                setLoading(true)
                console.log('Uploaded a data_url string!');
                getDownloadURL(storageRef).then((downloadURL) => {
                    console.log(downloadURL,"bal")
                    updateProfile(auth.currentUser, {
                        photoURL: downloadURL
                      }).then(() => {
                        navigate('/profile')
                        setImage('')
                        setCropData('')
                        update(refs(db, 'users/' + data.uid), {
                            img: downloadURL
                        })
                    })
                });
            });
        }
    };
    return (
        <div>
            <section className='bg-primary h-screen flex justify-center items-center'>
                <div className="bg-white py-6 md:w-[500px] w-full rounded-xl">
                    <div className="px-6">
                        <h2 className='font-public font-semibold text-xl text-[#343a40]'>Upload Profile Picture</h2>
                    </div>
                    <div className="overflow-hidden rounded-full mx-auto mt-[20px] w-[100px] h-[100px]">
                        {
                            image ?
                                <div
                                    className="img-preview w-[100px] h-[100px] rounded-full"
                                />
                                :
                                image ?
                                    <img className="w-full h-full rounded-full text-2xl text-[#878A92] font-public font-normal" src={person} alt="person" />
                                    :
                                    <img className="w-full h-full rounded-full text-2xl text-[#878A92] font-public font-normal" src={data.photoURL} alt="person" />
                        }

                    </div>
                    <div className="px-6 mt-[20px]">
                        <input onChange={handleUpload} className='font-public font-semibold w-full text-base text-[#878A92]' type="file" />
                        {
                            image &&
                            <Cropper
                                className="mt-[20px]"
                                ref={cropperRef}
                                style={{ height: 400, width: "100%" }}
                                zoomTo={0.5}
                                initialAspectRatio={1}
                                preview=".img-preview"
                                src={image}
                                viewMode={1}
                                minCropBoxHeight={10}
                                minCropBoxWidth={10}
                                background={false}
                                responsive={true}
                                autoCropArea={1}
                                checkOrientation={false}
                                guides={true}
                            />
                        }
                    </div>
                    <div className="px-6 mt-[40px] gap-x-6">
                        {
                            loading ?
                                <Rings
                                    visible={true}
                                    height="100"
                                    width="100"
                                    color="#4fa94d"
                                    ariaLabel="rings-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                />
                                :
                                <button onClick={getCropData} className="font-public font-medium text-xl text-white bg-[#7269EF] py-3 px-8 mr-4 rounded-xl cursor-pointer">Upload</button>
                        }
                        <button className="font-public font-medium text-xl text-white bg-red-500 py-3 px-8 ml-4 rounded-xl  cursor-pointer"><Link to="/profile">Cancel</Link></button>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default ProfileUpload