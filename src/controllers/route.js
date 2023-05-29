import { PrismaClient } from "@Prisma/Client";
import bcrypt from "bcryptjs";

const Prisma = new PrismaClient();

export const vistaHome = (req, res) => {
  res.send("Welcome");
};

//POSTS

export const Registro_Usuario = async (req, res) => {
  console.log(req.body);
  const { Usuario, Nombre, Apellidos, Email, Clave, Fecha_nacimiento } =
    req.body;
  try {
    const result = await Prisma.Usuarios.create({
      data: {
        Usuario,
        Nombre,
        Apellidos,
        Email,
        Clave: await bcrypt.hash(Clave, 1),
        Fecha_nacimiento: new Date(Fecha_nacimiento),
      },
    });
    res.json(result);
  } catch (error) {
    if (error.code === "P2002") {
      // Código de error P2002 indica una violación de restricción de clave única
      res
        .status(400)
        .json({ error: "El correo electrónico ya existe en la base de datos" });
    } else {
      // Otro tipo de error
      console.error(error);
      res.status(500).json({ error: "Se produjo un error en el servidor" });
    }
  }
};
/*
export const Registro_Artista = async (req, res) => {
  console.log(req.body);
  const { ID, Nombre } = req.body;
  const result = await Prisma.Artistas.create({
    data: {
      ID,
      Nombre,
    },
  });
  res.json(result);
};
*/
/*
export const Registro_Artistas_favoritos = async (req, res) => {
  console.log(req.body);
  const { ID_Usuario, ID_Artista } = req.body;
  const result = await Prisma.Artistas_favoritos.create({
    data: {
      ID_Usuario,
      ID_Artista,
    },
  });
  res.json(result);
};
*/
/*
export const Registro_Genero = async (req, res) => {
  console.log(req.body);
  const { ID, Nombre } = req.body;
  const result = await Prisma.Generos.create({
    data: {
      ID,
      Nombre,
    },
  });
  res.json(result);
};
*/
/*
export const Registro_Album = async (req, res) => {
  console.log(req.body);
  const { ID, Nombre, ID_Artista } = req.body;
  const result = await Prisma.Albumes.create({
    data: {
      ID,
      Nombre,
      ID_Artista,
    },
  });
  res.json(result);
};
*/
export const Registro_Cancion = async (req, res) => {
  console.log(req.body);
  const { trackid,url,title,artist,artwork } = req.body;
  const result = await Prisma.Canciones.create({
    data: {
      trackid:trackid,
      url:url,
      title:title,
      artist:artist,
      artwork:artwork
    },
  });
  res.json(result);
};

export const Registro_Playlist = async (req, res) => {
  const { Nombre, ID_Usuario } = req.body;

  // Verificar si ya existe una playlist con el mismo nombre y el mismo ID de usuario
  const existingPlaylist = await Prisma.Playlists.findFirst({
    where: { Nombre, ID_Usuario },
  });

  if (existingPlaylist) {
    // Ya existe una playlist con el mismo nombre y el mismo ID de usuario
    return res.status(400).json({ error: 'Ya existe una playlist con el mismo nombre' });
  }

  // Crear la nueva playlist
  const result = await Prisma.Playlists.create({
    data: {
      Nombre,
      ID_Usuario,
    },
  });

  res.json(result);
};

export const Registro_contenido_Playlist = async (req, res) => {
  console.log(req.body);
  const { ID_Playlist, ID_Cancion } = req.body;

  try {
    const playlist = await Prisma.Playlists.findUnique({
      where: { ID: ID_Playlist },
    });

    if (!playlist) {
      // La playlist no existe
      return res.status(404).json({ error: "La playlist no existe" });
    }

    const song = await Prisma.Canciones.findUnique({
      where: { trackid: ID_Cancion },
    });

    if (!song) {
      const { trackid, url, title, artist, artwork } = req.body;

      song = await Prisma.Canciones.create({
        data: {
          trackid,
          url,
          title,
          artist,
          artwork,
        },
      });
    }

    // Agregar la canción a la playlist
    const result = await Prisma.Playlist_canciones.create({
      data: {
        Playlists: {
          connect: { ID: ID_Playlist },
        },
        Canciones: {
          connect: { trackid: ID_Cancion },
        },
      },
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Se produjo un error en el servidor" });
  }
};

export const Registro_Cancionfav = async (req, res) => {
  console.log(req.body);
  const { ID_Usuario, ID_Cancion } = req.body;
  const result = await Prisma.Canciones_favoritas.create({
    data: {
      ID_Usuario,
      ID_Cancion,
    },
  });
  res.json(result);
};
//GET
export const Login = async (req, res) => {
  const { Email, Clave } = req.body;
  const user = await Prisma.Usuarios.findFirst({
    where: {
      Email: Email,
    },
  });
  if (!user) {
    console.log(user);
    return res.json("No se encontró el usuario");
  }

  const match = await bcrypt.compare(Clave, user.Clave);
  if (match) {
    console.log(res.json(user));
    return res.json(user);
  } else {
    return res.json("No son las credenciales correctas");
  }
};


export const getUsers = async (req, res) => {
  const users = await Prisma.Usuarios.findMany();
  res.json(users);
};

export const getSongs = async (req, res) => {
  const songs = await Prisma.Canciones.findMany();
  res.json(songs);
};

export const getPlayList = async (req, res) => {
  const playlists = await Prisma.Playlists.findMany({
    where: {
      ID_Usuario: req.body.ID_Usuario,
    },
    include: {
      Playlist_canciones: {
        include: {
          Canciones: true,
        },
      },
    },
  });

  res.json(playlists);
};
//DELETE
export const DeleteUser = async (req, res) => {
  
  const {id} = req.body
  const result = await Prisma.usuarios.delete({
    where: {
       ID: id,
    }
  })
  return result
}

export const DeletePlaylist = async (req, res) => {
  
  const {id} = req.body
  console.log(id)
  await Prisma.Playlist_canciones.deleteMany({
    where: {
      ID_Playlist: id,
    },
  });
  const result = await Prisma.Playlists.delete({
    where: {
       ID: id,
    }
  })
  return result
}

//UPDATE
export const updateUser = async (req, res) => {
  const { ID ,Nombre, Apellidos, Email, Fecha_nacimiento } = req.body;

  try {
    const user = await Prisma.Usuarios.findUnique({
      where: { ID: parseInt(ID) },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const dataToUpdate = {};

    if (Nombre) {
      dataToUpdate.Nombre = Nombre;
    }

    if (Apellidos) {
      dataToUpdate.Apellidos = Apellidos;
    }

    if (Email) {
      dataToUpdate.Email = Email;
    }

    if (Fecha_nacimiento) {
      dataToUpdate.Fecha_nacimiento = new Date(Fecha_nacimiento);
    }

    const updatedUser = await Prisma.Usuarios.update({
      where: { ID: parseInt(ID) },
      data: dataToUpdate,
    });

    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'An error occurred while updating the user.' });
  }
};

//ALTER FAV MUSIC
export const postFav = async (req, res) => {
  const userId = req.body.ID_Usuario
  const songId = req.body.ID_Cancion
  console.log(req.body)
  console.log(userId)
  try {
    // Verificamos si la canción ya existe en la tabla de "Canciones_favoritas" para el usuario específico
    const existingFavorite = await Prisma.Canciones_favoritas.findFirst({
      where: {
        
        ID_Usuario: userId,
        ID_Cancion: songId,
        
      },
    });

    if (existingFavorite) {
      // Si la canción ya existe en la tabla de "Canciones_favoritas" para el usuario específico, la eliminamos
      await Prisma.Canciones_favoritas.delete({
        where: {
          ID_Usuario_ID_Cancion: {
          ID_Usuario: userId,
          ID_Cancion: songId,
          }
        },
      });

      res.status(200).json({ message: 'Canción eliminada de favoritos exitosamente.' });
    } else {
      // Si la canción no existe en la tabla de "Canciones_favoritas" para el usuario específico, la agregamos
      await Prisma.Canciones_favoritas.create({
        data: {
          ID_Usuario: userId,
          ID_Cancion: songId
        }
      });
      res.json(result);
    }
  }catch(error){
    console.error(error)
    res.status(500).send('Error creating new entry in database');
  }
}
