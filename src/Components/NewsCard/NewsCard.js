import React, { useState, useEffect } from 'react'
import { useGetData, useDeleteData, usePostData, useUploadFile, usePutData } from '../../Hooks/ServiceGetways';
import './style.css';
import Swal from 'sweetalert2';

const NewsCard = () => {

    const [data, setData] = useState(null)

    //axios.get function
    let getData = useGetData();

    //axios.delete function
    let deleteData = useDeleteData();

    //axios.post function
    let postData = usePostData();

    //axios.put function
    let putData = usePutData();

    //upload function
    let upload = useUploadFile();

    {/** Get Data **/ }
    useEffect(() => {
        getData(`posts`, {}).then(({ result }) => {
            setData(result.data);
        });
    }, [])

    {/** Post Data **/ }
    // let postData = async () => {
    //     await  postData(`data`, { idList: array }).then(({ result, result_message }) => {
    //         if (result_message.type === "error") console.log(result_message.message);
    //         setAttendees(result);
    //     });
    // }

    {/** Delete Data Data **/ }
    let deleteNews = async (id) => {
        Swal.fire({
            title: 'Haberi silnek istiyor musunuz ?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Evet',
            denyButtonText: `Hayır`,
            showCancelButton: false,
        }).then((result) => {
            if (result.isConfirmed) {
                deleteData(`posts/${id}`, {}).then(({ result }) => {
                    if (result.status === 200) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Haber başarıyla silindi..',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    } else {
                        Swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'Haber silinemedi!!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                });
            } else if (result.isDenied) {

            }
        })
    }

    {/** Update Data **/ }

    // let updateData = async () => {
    //     putData(`data/${data._id}`,
    //         { ...data, medias: data._id ? [...data.medias.filter(f => f._id), ...uploadMedias] : uploadMedias },
    //     ).then((data) => {
    //         if (data?.result_message?.type === "error") {
    //             console.log(data?.result_message?.message);
    //         }
    //         else {
    //             getData("secondhand", {}).then(({ result, result_message }) => {
    //                 if (result_message.type === "error") console.log(result_message.message);
    //                 message.success('Success Update..');
    //                 setEditSecondHandDetail(result)
    //             });
    //         }
    //     });
    // }

    {/** Upload Data **/ }
    // let postNews = async () => {
    //     upload({ files: post.medias }).then(({ result, result_message }) => {
    //         if (result) {
    //             postData(`post`, { ...post, medias: result }).then((data) => {
    //                 if (data.result_message.type === "error") {
    //                     console.log(data.result_message.message);
    //                 }
    //                 else {
    //                     getData("post", {}).then(({ result, result_message }) => {
    //                         if (result_message.type === "error") console.log(result_message.message);
    //                         message.success('Success Update..');
    //                         setSecondHand(result)
    //                     });
    //                 }
    //             });
    //         }
    //         else {
    //             message.error("Error")
    //         }
    //     })  
    // }

    return (
        <>
            {
                data && data.map((posts, i) => (
                    <section key={i} className="card mb-3">
                        <div className="card-header d-flex justify-content-between">
                            <h4 className="m-0">{posts.title}</h4>
                            <div className="cursor-pointer ml-4" onClick={() => deleteNews(posts.id)}>
                                <i className="far fa-trash-alt"></i>
                            </div>
                        </div>

                        <div className="card-body">
                            <p>{posts.body}</p>
                        </div>
                    </section>
                ))
            }
        </>
    )
}

export default NewsCard
