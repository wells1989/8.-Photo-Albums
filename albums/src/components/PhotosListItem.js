import { useRemovePhotoMutation } from "../store";
import { GoTrash } from "react-icons/go";

function PhotosListIem({ photo }) {

    const [removePhoto] = useRemovePhotoMutation();

    const handleRemovePhoto = () => {
        removePhoto(photo)
    }

    return <div onClick={handleRemovePhoto} className="relative m-2 cursor-pointer">
        <img className="h-20 w-20 rounded-md" src={photo.url} alt="not loaded" />
        <div className="absolute inset-0 flex items-center justify-center hover: bg-gray-200 opacity-0 hover:opacity-80">
            <GoTrash className="text-3xl" />
        </div>
        {/*above, covers the image element with gray and delete symbol */}
    </div>
}

export default PhotosListIem