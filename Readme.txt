Puesta a punto de la base de datos

Crear el contenedor de docker:
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root -e MYSQL_USER=root -e MYSQL_DATABASE=mangoplayer --name mango_games mysql

Para iniciar la API debemos ejecutar:
npm run dev

Luego ejecuta en la consola para crear las tablas, si hay algun cambio en el conetendor deberemos modificar la linea de Prisma en el fichero .env:
npx prisma migrate dev

Para añadir al usuario administrador debes ejecutar este comando:
npm run seed

