const { PrismaClient } = require('@prisma/client');

//init prisma client
const prisma = new PrismaClient();

const allHobby = async (req, res) => {
  try {
      const hobby = await prisma.hobby.findMany({
          select: {
              id: true,
              hobby: true,
              createdAt: true,
              updatedAt: true,
          },
          orderBy: {
              createdAt: "desc",
          },
      });
        res.render('layouts', {
        title: 'Hobby',
        body: 'index-mongodb',
        hobbies: hobby 
      });

  } catch (error) {
      res.status(500).send({
          success: false,
          message: "Internal server error",
      });
  }
};

const addHobby = async (req, res) => {
    try {
      const { hobby } = req.body;
      const newHobby = await prisma.hobby.create({
        data: { hobby },
      });
      res.redirect('/mongodb/index'); 
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  };

  const showHobbyById = async (req, res) => {
    try{
        const { id } =req.params;
        const hobby = await prisma.hobby.findUnique({
            where: { id: id }
        });
        res.render('layouts', {
            title: 'Hobby',
            body: 'show-mongodb',
            hobbies: hobby 
          });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
  }

  const editHobby = async (req, res) => {
    try{
        const { id } =req.params;
        const hobby = await prisma.hobby.findUnique({
            where: { id: id }
        });
        res.render('layouts', {
            title: 'Hobby',
            body: 'update-mongodb',
            hobby: hobby 
          });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message,
        })
    }
  }

const updateHobby = async (req, res) => {
    try {
       const {id, hobby} = req.body
        const udpatedHobby = await prisma.hobby.update({
            where: { id:id },
            data: {hobby:hobby}
        });
        res.redirect('/mongodb/index'); 
    } catch (error) {
        res.status(500).json({
            success: false,
            messsage: "Gagal mengupdate data",
            error: error.message
        })
    }
}

const deleteHobby = async (req, res) => {
    try {
        const { id } = req.body;
        const deletedHobby = await prisma.hobby.delete({
            where: {id: id}
        });
        res.redirect('/mongodb/index'); 
    } catch (error) {
        console.log(error.message)
        res.status(500).json({
            success:false,
            message: "gagal menghapus data",
            data: error.message
        })
    }
}

module.exports = {
  allHobby,
  addHobby,
  showHobbyById,
  updateHobby,
  deleteHobby,
  editHobby
}
