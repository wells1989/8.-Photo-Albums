import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchUsers } from '../store';
import Skeleton from '../components/Skeleton'
import { addUser } from '../store';
import Button from './Button'
import { useThunk } from '../hooks/use-thunk';
import UsersListItem from './UsersListItem';

function UsersList() {

    const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers)

    const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);
    // above, assigning the 3 things returned from the thunk as individual variables, e.g. the function, the isLoadingState for that function, and the error linked to that function

    const[newName, setNewName] = useState('');

    const handleChange = (event) => {
        setNewName(event.target.value)
    }

    useEffect(() => {
        doFetchUsers()
    }, [doFetchUsers]);
    // above if promise which is returned from dispatch, then goes into arrow function whether the request succeeds or fails (unlike normal promise .then function.) The argument to the .then() is the fulfilled or rejected action object

    const handleUserAdd = () => {
        doCreateUser(newName)
        setNewName('')
        document.getElementById("name-input").value = "";
    };

    const { data } = useSelector((state) => {
        return state.users;
    }); 

    let content;

    if (isLoadingUsers) {
        content = <Skeleton times={6} className="h-10 w-full" />
    } else if (loadingUsersError) {
        content = <div>Error fetching data ...</div>
    } else {
        content = data.map((user) => {
           return <UsersListItem key={user.id} user={user} /> 
        })
    }

    return (
        <div>
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

                {creatingUserError && 'Error creating user ...'}
            </div>
        {content}
    </div>
    )
}

export default UsersList;
