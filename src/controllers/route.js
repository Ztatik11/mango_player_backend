import {PrismaClient} from '@Prisma/Client'

const Prisma = new PrismaClient()


export const vistaHome = (req,res) =>{ 
    res.send('Welcome')
}

//POSTS

export const Registro_Usuario = async (req,res) =>{
    console.log(req.body)
    const {Usuario,Nombre,Apellidos,Email,Clave,Fecha_nacimiento}=req.body
    const result = await Prisma.Usuarios.create({
        data:{
            Usuario,
            Nombre,
            Apellidos,
            Email,
            Clave,
            Fecha_nacimiento: new Date(Fecha_nacimiento),
        }
    })
    res.json(result)
}

export const Registro_Artista = async (req,res) =>{
    console.log(req.body)
    const {ID,Nombre}=req.body
    const result = await Prisma.Artistas.create({
        data:{
            ID,
            Nombre,
        }
    })
    res.json(result)
}

export const Registro_Artistas_favoritos = async (req,res) =>{
    console.log(req.body)
    const {ID_Usuario,ID_Artista}=req.body
    const result = await Prisma.Artistas.create({
        data:{
            ID_Usuario,
            ID_Artista
        }
    })
    res.json(result)
}

export const Registro_Genero = async (req,res) =>{
    console.log(req.body)
    const {ID,Nombre}=req.body
    const result = await Prisma.Generos.create({
        data:{
            ID,
            Nombre,
        }
    })
    res.json(result)
}

export const Registro_Album = async (req,res) =>{
    console.log(req.body)
    const {ID,Nombre,ID_Artista}=req.body
    const result = await Prisma.Albumes.create({
        data:{
            ID,
            Nombre,
            ID_Artista
        }
    })
    res.json(result)
}

export const Registro_Cancion = async (req,res) =>{
    console.log(req.body)
    const {ID,Nombre,ID_Artista,ID_Genero,ID_Album,Enlace}=req.body
    const result = await Prisma.Canciones.create({
        data:{
            ID,
            Nombre,
            ID_Artista,
            ID_Genero,
            ID_Album,
            Enlace
        }
    })
    res.json(result)
}

export const Registro_Playlist = async (req,res) =>{
    console.log(req.body)
    const {Nombre,ID_Usuario}=req.body
    const result = await Prisma.Playlists.create({
        data:{
            Nombre,
            ID_Usuario,
        }
    })
    res.json(result)
}

export const Registro_contenido_Playlist = async (req,res) =>{
    console.log(req.body)
    const {Nombre,ID_Usuario}=req.body
    const result = await Prisma.Playlist_canciones.create({
        data:{
            Nombre,
            ID_Usuario,
        }
    })
    res.json(result)
}

export const Registro_Cancionfav = async (req,res) =>{
    console.log(req.body)
    const {ID_Usuario,ID_Cancion}=req.body
    const result = await Prisma.Canciones_favoritas.create({
        data:{
            ID_Usuario,
            ID_Cancion
        }
    })
    res.json(result)
}

export const Login = async (req,res) =>{
    const { email } = req.body;
  const user = await Prisma.Usuarios.findFirst({
    where: {
        Email: email,
    },
  });
  res.json(user);
}
