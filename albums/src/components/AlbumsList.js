import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store';
import Skeleton from './Skeleton';
import ExpandablePanel from './ExpandablePanel';
import Button from './Button';
import { useState } from 'react';

export const AlbumTitleCreation = () => {
    const [newTitle, setNewTitle] = useState('');
    setNewTitle("testing")
    return newTitle
}

function AlbumsList({ user }) {

    let newTitle = AlbumTitleCreation();

     const { data, error, isLoading} = useFetchAlbumsQuery(user);
    // will return the data from the api, and error / isLoading
    
    // the useFetchAlbums hook has properties such as data / isError / isFetching / isLoading / isSuccess
    // test to see above, const results = useFetchAlbumsQuery() + console.log(results)

    const [addAlbum, results] = useAddAlbumMutation();

    const handleAddAlbum = () => {
        addAlbum(user);
    }
    // 2nd request as the first function call adds the album but would need a refresh to show it. Here you make 2 requests, so is slower but easier to code (would be good for apps with small user bases, who won't be making large numbers of requests etc)

    let content;

    if(isLoading) {
        content = <Skeleton times={3} />
    } else if (error) {
        content = <div>Error loading albums</div>
    } else {
        content = data.map((album) => {
            const header = <div>{album.title}</div>

            return <ExpandablePanel key={album.id} header={header}>
                List of photos
            </ExpandablePanel>
        })
    }

    /*
<div className="flex flex-row justify-between items-center m-3">
    <h1 className="m-2 text-xl">Users</h1>
    <form onSubmit={handleUserAdd}>
        <label/>
        <input id="name-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="enter new user here"
        onChange={handleChange}
        />
    </form>
    <Button loading={isCreatingUser} onClick={handleUserAdd}>Add user</Button>
    */
    
    return <div>
        <div>
            Albums for {user.name}
            <form>
                <label/>
                <input id="album-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="enter new album here"
                
                />
            </form>
            <Button onClick={handleAddAlbum}>
                Add Album
            </Button>
        </div>
        <div>
            {content}
        </div>
    </div>
}

export default AlbumsList;
/*
    const[newName, setNewName] = useState('');

    const handleChange = (event) => {
        setNewName(event.target.value)
    }

    const handleUserAdd = () => {
        if (!newName) {
            alert("please input a name")
            return
        }
        doCreateUser(newName)
        setNewName('')
        document.getElementById("name-input").value = "";
    };

    <div className="flex flex-row justify-between items-center m-3">
    <h1 className="m-2 text-xl">Users</h1>
    <form onSubmit={handleUserAdd}>
        <label/>
        <input id="name-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="enter new user here"
        onChange={handleChange}
        />
    </form>
    <Button loading={isCreatingUser} onClick={handleUserAdd}>Add user</Button> 

*/
