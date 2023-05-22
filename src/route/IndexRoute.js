import {vistaHome, Registro_Usuario, Registro_Cancion, Registro_Playlist,Registro_contenido_Playlist,Login, getUsers,DeleteUser,getSongs,postFav, updateUser} from "../controllers/route.js";
import { Router } from "express";
const router = Router();

router.post('/postUser', Registro_Usuario)
/*
router.post('/postArtist', Registro_Artista)
router.post('/postArtistfav', Registro_Artistas_favoritos)
router.post('/postGenre', Registro_Genero)
router.post('/postAlbum', Registro_Album)
*/
router.post('/postTrack', Registro_Cancion)
router.post('/postPlaylist', Registro_Playlist)
router.post('/postPlaylistContent', Registro_contenido_Playlist)
router.post('/postFavTrack', postFav)
router.get('/', vistaHome)
router.get('/login', Login)
router.get('/getUsers', getUsers)
router.get('/getSongs', getSongs)
router.delete('/deleteUser', DeleteUser)
router.put('/updatedUser',updateUser)


export default router;