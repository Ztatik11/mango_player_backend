import {PrismaClient} from '@Prisma/Client'

const Prisma = new PrismaClient()


export const vistaHome = (req,res) =>{ 
    res.send('Welcome')
}

export const Registro = async (req,res) =>{
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