import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store';
import Skeleton from './Skeleton';
import Button from './Button';
import AlbumsListItem from './AlbumsListItem';
import { useState } from 'react';

function AlbumsList({ user }) {
    const { data, error, isFetching} = useFetchAlbumsQuery(user);

    const [addAlbum, results] = useAddAlbumMutation();

    const[newAlbum, setNewAlbum] = useState('')

    let localState = {
        newAlbum: newAlbum
    }

    const handleChange = (event) => {
        setNewAlbum(event.target.value)
    }

    const handleAddAlbum = () => {
        if (!newAlbum) {
            alert("please input an album name")
            return;
        }

        addAlbum({user, localState})
        setNewAlbum('');
        document.getElementById("album-input").value = "";
    }

    let content;

    if(isFetching) {
        content = <Skeleton className="h-10 w-full" times={3} />
    } else if (error) {
        content = <div>Error loading albums</div>
    } else {
        content = data.map((album) => {
            return <AlbumsListItem key={album.id} album={album} />
        })
    }
    
    return <div>
        <div className="m-2 flex flex-row items-center justify-center">
            <h3 className="text-lg font-bold m-2">Albums for {user.name}</h3>
            <form onSubmit={handleAddAlbum}>
                    <label/>
                    <input id="album-input" className=" w-70 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="enter new Album here"
                    onChange={handleChange}
                    />
                </form>
            <Button className="ml-5 bg-gray-100 border rounded-md cursor-pointer border-solid border-2 border-indigo-600 hover:bg-gray-300" loading={results.isLoading} onClick={handleAddAlbum}>
                Add Album
            </Button>
        </div>
        <div>
            {content}
        </div>
    </div>
}

export default AlbumsList;
