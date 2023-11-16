import { useFetchAlbumsQuery, useAddAlbumMutation } from '../store';
import Skeleton from './Skeleton';
import ExpandablePanel from './ExpandablePanel';
import Button from './Button';

function AlbumsList({ user }) {
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
    
    return <div>
        <div>
            Albums for {user.name}
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
