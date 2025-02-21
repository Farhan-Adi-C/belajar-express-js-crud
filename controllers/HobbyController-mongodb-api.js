const { PrismaClient } = require("@prisma/client");

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
    res.status(200).send({
      success: true,
      message: "Get All hobbies Successfully",
      data: hobby,
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
    res.status(200).json({
      success: true,
      message: "berhasil menambah data",
      data: newHobby,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const showHobbyById = async (req, res) => {
  try {
    const { id } = req.params;
    const hobby = await prisma.hobby.findUnique({
      where: { id: id },
    });
    res.status(200).json({
      success: true,
      message: "berhasil menampilkan data berdasarkan id",
      data: hobby,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const updateHobby = async (req, res) => {
  try {
    const { id, hobby } = req.body;
    const udpatedHobby = await prisma.hobby.update({
      where: { id: id },
      data: { hobby: hobby },
    });
    res.status(200).json({
      success: true,
      message: "berhasil mengupdate data",
      data: udpatedHobby,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      messsage: "Gagal mengupdate data",
      error: error.message,
    });
  }
};

const deleteHobby = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedHobby = await prisma.hobby.delete({
      where: { id: id },
    });
    res.status(200).json({
      success: true,
      message: "berhasil menghapus data",
      data: deletedHobby,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "gagal menghapus data",
      data: error.message,
    });
  }
};

module.exports = {
  allHobby,
  addHobby,
  showHobbyById,
  updateHobby,
  deleteHobby,
};
