import { useFetchPhotosQuery, useAddPhotoMutation } from "../store"
import Button from "./Button";
import Skeleton from './Skeleton';
import PhotosListIem from "./PhotosListItem";

function PhotosList({ album }) {

    const { data, error, isFetching} = useFetchPhotosQuery(album);

    const [addPhoto, results] = useAddPhotoMutation();

    const handleAddPhoto = () => {
        addPhoto(album);
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
        <div className="m-2 flex flex-row items-center justify-between">
            <h3 className="text-lg font-bold">Photos in album {album.title}</h3>
            <Button isLoading={results.isLoading} onClick={handleAddPhoto}>
                Add photo
            </Button>
        </div>

        <div className="flex flex-row flex-wrap justify-center">
            {content}
        </div>
    </div>
}

export default PhotosList