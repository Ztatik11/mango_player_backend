-- CreateTable
CREATE TABLE `Albumes` (
    `ID` VARCHAR(200) NOT NULL,
    `Nombre` VARCHAR(30) NULL,
    `ID_Artista` VARCHAR(200) NULL,

    INDEX `fk_ID_Artista_Album`(`ID_Artista`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Artistas` (
    `ID` VARCHAR(200) NOT NULL,
    `Nombre` VARCHAR(30) NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Artistas_favoritos` (
    `ID_Usuario` INTEGER NOT NULL,
    `ID_Artista` VARCHAR(200) NOT NULL,

    INDEX `fk_ID_Artista_favoritos`(`ID_Artista`),
    PRIMARY KEY (`ID_Usuario`, `ID_Artista`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Canciones` (
    `ID` VARCHAR(200) NOT NULL,
    `Nombre` VARCHAR(50) NULL,
    `ID_Artista` VARCHAR(200) NULL,
    `ID_Genero` VARCHAR(200) NULL,
    `ID_Album` VARCHAR(200) NULL,
    `Enlace` VARCHAR(200) NULL,

    INDEX `fk_ID_Cancion_Album`(`ID_Album`),
    INDEX `fk_ID_Cancion_Artista`(`ID_Artista`),
    INDEX `fk_ID_Cancion_Genero`(`ID_Genero`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Generos` (
    `ID` VARCHAR(200) NOT NULL,
    `Nombre` VARCHAR(30) NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Playlist_canciones` (
    `ID_Playlist` INTEGER NOT NULL,
    `ID_Cancion` VARCHAR(200) NOT NULL,

    INDEX `fk_ID_Cancion`(`ID_Cancion`),
    PRIMARY KEY (`ID_Playlist`, `ID_Cancion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Playlists` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Nombre` VARCHAR(50) NULL,
    `ID_Usuario` INTEGER NULL,

    INDEX `fk_ID_Usuario_Playlist`(`ID_Usuario`),
    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuarios` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Usuario` VARCHAR(15) NULL,
    `Nombre` VARCHAR(30) NULL,
    `Apellidos` VARCHAR(50) NULL,
    `Email` VARCHAR(100) NULL,
    `Clave` VARCHAR(20) NULL,
    `Fecha_nacimiento` DATE NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Albumes` ADD CONSTRAINT `fk_ID_Artista_Album` FOREIGN KEY (`ID_Artista`) REFERENCES `Artistas`(`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Artistas_favoritos` ADD CONSTRAINT `fk_ID_Artista_favoritos` FOREIGN KEY (`ID_Artista`) REFERENCES `Artistas`(`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Artistas_favoritos` ADD CONSTRAINT `fk_ID_Usuario` FOREIGN KEY (`ID_Usuario`) REFERENCES `Usuarios`(`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Canciones` ADD CONSTRAINT `fk_ID_Cancion_Album` FOREIGN KEY (`ID_Album`) REFERENCES `Albumes`(`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Canciones` ADD CONSTRAINT `fk_ID_Cancion_Artista` FOREIGN KEY (`ID_Artista`) REFERENCES `Artistas`(`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Canciones` ADD CONSTRAINT `fk_ID_Cancion_Genero` FOREIGN KEY (`ID_Genero`) REFERENCES `Generos`(`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Playlist_canciones` ADD CONSTRAINT `fk_ID_Cancion` FOREIGN KEY (`ID_Cancion`) REFERENCES `Canciones`(`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Playlist_canciones` ADD CONSTRAINT `fk_ID_Playlist` FOREIGN KEY (`ID_Playlist`) REFERENCES `Playlists`(`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Playlists` ADD CONSTRAINT `fk_ID_Usuario_Playlist` FOREIGN KEY (`ID_Usuario`) REFERENCES `Usuarios`(`ID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
