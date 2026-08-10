const musicModel = require("../models/music.model");
const albumModel = require("../models/album.model");
const { uploadFile } = require("../services/storage.service")
const jwt = require("jsonwebtoken");


async function createMusic(req, res) {
    // const cookieToken = req.cookies?.token
    // const bodyToken = req.body?.token
    // const authHeader = req.headers.authorization
    // const bearerToken = authHeader && authHeader.startsWith('Bearer ')
    //     ? authHeader.slice(7)
    //     : null
    // const token = cookieToken || bodyToken || bearerToken

    // if (!token) {
    //     return res.status(401).json({ message: "Unauthorized" })
    // }

    // let decoded

    // try {
    //     decoded = jwt.verify(token, process.env.JWT_SECRET)
    // } catch (error) {
    //     return res.status(401).json({ message: "Unauthorized" })
    // }

    // if (decoded.role !== 'artist') {
    //     return res.status(403).json({ message: "You do not have permission to create music" })
    // }

    const { title } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: "Music file is required" })
    }

    const result = await uploadFile(file.buffer.toString('base64'))

    const music = await musicModel.create({
        uri: result.url,
        title,
        artist: req.user.id,
    })

    res.status(201).json({
        message: "Music created successfully",
        music: {
            id: music._id,
            uri: music.uri,
            title: music.title,
            artist: music.artist,
        }
    })

}

async function createAlbum(req, res) {
  
        const { title, musics } = req.body

        const album = await albumModel.create({
            title,
            artist: req.user.id,
            musics: musics
        })

        res.status(201).json({
            message: "Album created successfully",
            album: {
                id: album._id,
                title: album.title,
                artist: album.artist,
                musics: album.musics
            }
        })

    }

async function getAllMusics(req, res) {
    const musics = await musicModel
                    .find()
                    .skip(2)
                    .limit(1)
                    .populate('artist', 'username email')

    res.status(200).json({
        message: "Musics fetched successfully",
        musics: musics
    })
}


async function getAllAlbums(req, res) {
    const albums = await albumModel.find().select("title artist").populate('artist', 'username email').populate('musics')

    res.status(200).json({
        message: "Albums fetched successfully",
        albums: albums
    })
}


async function getAlbumById(req, res) {
    const albumId = req.params.id

    const album = await albumModel.findById(albumId).populate('artist', 'username email').populate('musics')

    if (!album) {
        return res.status(404).json({ message: "Album not found" })
    }

    return res.status(200).json({
        message: "Album fetched successfully",
        album: album
    })
}
    
module.exports = { createMusic, createAlbum, getAllMusics, getAllAlbums, getAlbumById } 