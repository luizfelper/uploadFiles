import { useState, useEffect } from "react";
import * as C from "./styles";
import * as Photos from "../../src/services/Photos";
import { Photo } from "../../src/types/PhotosTypes";
import { PhotoItem } from "../../src/components/PhotoItem";

const UploadImages = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const getPhotos = async () => {
      setLoading(true);
      setPhotos(await Photos.getAll());
      setLoading(false);
    };
    getPhotos();
  }, []);
  return (
    <C.Container>
      <C.Area>
        <C.Header>Galeria de Fotos</C.Header>
        {/* Área de Upload */}

        {loading && (
          <C.ScreenWarning>
            <div className="emoji">✋</div>
            <div>Carregando...</div>
          </C.ScreenWarning>
        )}
        {!loading && photos.length === 0 && (
          <C.ScreenWarning>
            <div className="emoji">❌</div>
            <div>Não há fotos cadastradas.</div>
          </C.ScreenWarning>
        )}
        {!loading && (
          <C.PhotoList>
            {photos.map((item, index) => (
              <PhotoItem key={index} url={item.url} name={item.name} />
            ))}
          </C.PhotoList>
        )}
      </C.Area>
    </C.Container>
  );
};

export default UploadImages;
