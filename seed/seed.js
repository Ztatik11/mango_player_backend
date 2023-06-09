import { PrismaClient } from "@Prisma/Client";

const prisma = new PrismaClient();

async function seed() {
  try {
    await prisma.usuario.create({
      data: {
        Usuario: 'a',
        Nombre: 'Alvaro',
        Apellidos: 'Carrasco Garcia',
        Email: 'alvarocarrascogarcia6@gmail.com',
        Clave: '$2a$04$gyqP9DFVTuPMwpnhwOtJee.XyTGdLlNS66I0s3mSKUt7y/RWKp576',
        Fecha_nacimiento: new Date('2000-10-10T00:00:00.000Z'),
      },
    });

    console.log('Datos migrados exitosamente.');
  } catch (error) {
    console.error('Error al migrar datos:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
