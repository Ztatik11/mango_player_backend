
create database mangoplayer;

use mangoplayer;

create table Usuarios(
    ID int PRIMARY KEY AUTO_INCREMENT,
    Usuario VARCHAR(15),
    Nombre VARCHAR(30),
    Apellidos VARCHAR(50),
    Email VARCHAR(30),
    Clave VARCHAR(20),
    Fecha_nacimiento DATE
);

create table Playlists(
    ID int PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(50),
    ID_Usuario int,
	Constraint fk_ID_Usuario_Playlist foreign key (ID_Usuario) references Usuarios(ID)

);

create table Artistas(
    ID VARCHAR(200) PRIMARY KEY,
    Nombre VARCHAR(30)
);

create table Artistas_favoritos(
	ID_Usuario int,
    ID_Artista VARCHAR(200),
    Constraint fk_ID_Usuario foreign key (ID_Usuario) references Usuarios(ID),
    Constraint fk_ID_Artista_favoritos foreign key (ID_Artista) references Artistas(ID),
	Primary key(ID_Usuario,ID_Artista)
);

create table Albumes(
    ID VARCHAR(200) PRIMARY KEY,
    Nombre VARCHAR(30),
    ID_Artista VARCHAR(200),
    Constraint fk_ID_Artista_Album foreign key (ID_Artista) references Artistas(ID)
);

create table Generos(
    ID VARCHAR(200) PRIMARY KEY,
    Nombre VARCHAR(30)
);

create table Canciones(
    ID VARCHAR(200) PRIMARY KEY,
    Nombre VARCHAR(50),
    ID_Artista VARCHAR(200),
    ID_Genero VARCHAR(200),
    ID_Album VARCHAR(200),
    Enlace VARCHAR(200),
	Constraint fk_ID_Cancion_Genero foreign key (ID_Genero) references Generos(ID),
    	Constraint fk_ID_Cancion_Artista foreign key (ID_Artista) references Artistas(ID),
	Constraint fk_ID_Cancion_Album foreign key (ID_Album) references Albumes(ID)
);

create table Playlist_canciones(
	ID_Playlist int,
    ID_Cancion VARCHAR(200),
    Constraint fk_ID_Playlist foreign key (ID_Playlist) references Playlists(ID),
    Constraint fk_ID_Cancion foreign key (ID_Cancion) references Canciones(ID),
	Primary key(ID_Playlist,ID_Cancion)
)
