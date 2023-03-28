import {vistaHome, Registro_Usuario, Registro_Artista, Registro_Artistas_favoritos , Registro_Genero ,Registro_Album, Registro_Cancion, Registro_Playlist,Registro_contenido_Playlist, Registro_Cancionfav ,Login} from "../controllers/route.js";
import { Router } from "express";
const router = Router();

router.post('/postUser', Registro_Usuario)
router.post('/postArtist', Registro_Artista)
router.post('/postArtistfav', Registro_Artistas_favoritos)
router.post('/postGenre', Registro_Genero)
router.post('/postAlbum', Registro_Album)
router.post('/postTrack', Registro_Cancion)
router.post('/postPlaylist', Registro_Playlist)
router.post('/postPlaylistContent', Registro_contenido_Playlist)
router.post('/postFavTrack', Registro_Cancionfav)
router.get('/', vistaHome)
router.get('/login', Login)


export default router;