import { useFetchPhotosQuery, useAddPhotoMutation } from "../store"
import Button from "./Button";
import Skeleton from './Skeleton';
import PhotosListIem from "./PhotosListItem";
import { useState } from "react";
import { faker } from '@faker-js/faker';

function PhotosList({ album }) {

    const { data, error, isFetching} = useFetchPhotosQuery(album);
    const[newPhotoUrl, setNewPhotoUrl] = useState('')

    const [addPhoto, results] = useAddPhotoMutation();

    let localState = {
        url: newPhotoUrl
    }

    function isValidUrl(_string) {
        const matchpattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
        return matchpattern.test(_string);
      }

    const handleAddPhoto = () => {
        if (!isValidUrl(newPhotoUrl) || !newPhotoUrl) {
            alert("please input valid url")
             return 
            }
        // checks if valid url address and not empty

        addPhoto({album, localState});
        setNewPhotoUrl('');
        document.getElementById("photo-input").value = "";
        // clearing the variable, and input id field ...
    }

    const handleAddRandomPhoto = () => {
        setNewPhotoUrl(faker.image.urlLoremFlickr())

        addPhoto({album, localState});
    }

    const handleChange = (event) => {
        setNewPhotoUrl(event.target.value)
    }

    let content;

    if (isFetching) {
        content = <Skeleton className="h-8 w-8" times={4} />
    } else if (error) {
        content = <div>Error fetching photos</div>
    } else {
        content = data.map((photo) => {
            return <PhotosListIem key={photo.id} photo={photo} />
        })
    }

    return <div>
        <div className="m-2 flex flex-row items-center justify-center">
            <h3 className="text-lg font-bold mr-5">Photos in album {album.title}</h3>
            <form onSubmit={handleAddPhoto}>
                    <label/>
                    <input id="photo-input" className=" w-70 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="enter new Photo Url here"
                    onChange={handleChange}
                    />
                </form>
            <Button className="ml-5 bg-gray-100 border rounded-md cursor-pointer border-solid border-2 border-indigo-600 hover:bg-gray-300" isLoading={results.isLoading} onClick={handleAddPhoto}>
                Add photo
            </Button>
            <Button className="ml-5 bg-blue-100 border rounded-md cursor-pointer border-solid border-2 border-indigo-600 hover:bg-gray-300" isLoading={results.isLoading} onClick={handleAddRandomPhoto}>
                Randomly Generated photo
            </Button>
        </div>

        <div className="flex flex-row flex-wrap justify-center">
            {content}
        </div>
    </div>
}

export default PhotosList