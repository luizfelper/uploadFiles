import { Photo } from "../types/PhotosTypes";
import { storage } from "../libs/firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage"

export const getAll = async () => {
    let list: Photo[] = [];

    const imagesFolder = ref(storage, "images");
    const photoList = await listAll(imagesFolder);
    console.log(photoList.items);

    for(let i in photoList.items) {
        let photoUrl = await getDownloadURL(photoList.items[i]);
        list.push({
            name: photoList.items[i].name,
            url: photoUrl
        });
        console.log(photoUrl);
    }

    return list;
}