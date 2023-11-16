import { GoTrash } from 'react-icons/go';
import Button from './Button';
import { removeUser } from '../store';
import { useThunk } from '../hooks/use-thunk';
import ExpandablePanel from './ExpandablePanel';
import AlbumsList from './AlbumsList';

function UsersListItem({ user }) {

    const [doRemoveUser, isLoading, error] = useThunk(removeUser);

    const handleClick = () => {
        doRemoveUser(user)
    }

    const header= <>
        <Button className="mr-3" loading={isLoading} onClick={handleClick}>
                <GoTrash />
                </Button>
                {error && <div>error deleting user </div>}
            {user.name}
    </>
    // fragment, allows you to put it below without extra jsx elements, as if there were extra elements would lose the classNames in ExpandablePanel.js

    return (
        <ExpandablePanel header={header}>
            <AlbumsList user={user} />
        </ExpandablePanel>
    )
}

export default UsersListItem;
