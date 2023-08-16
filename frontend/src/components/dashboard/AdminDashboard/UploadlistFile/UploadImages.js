import axios from 'axios'

export const singleImage = async (file) => {

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'add-product')
    formData.append('folder', 'aquariumShop')
 const {data} = await axios.post('https://api.cloudinary.com/v1_1/personal-use-only/image/upload', formData)
  return {url:data?.secure_url.toString()}
  }

export const multipleImages = async (file) => {

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'add-product')
    formData.append('folder', 'aquariumvariants')
 const {data} = await axios.post('https://api.cloudinary.com/v1_1/personal-use-only/image/upload', formData)
  return {url:data?.secure_url.toString()}
  }

export const updateSingleImage = async (file) => {

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'add-product')
    formData.append('folder', 'updateAquariumShop')
 const {data} = await axios.post('https://api.cloudinary.com/v1_1/personal-use-only/image/upload', formData)
  return {url:data?.secure_url.toString()}
  }

export const updateMultipleImages = async (file) => {

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', 'add-product')
    formData.append('folder', 'updateAquariumVariants')
 const {data} = await axios.post('https://api.cloudinary.com/v1_1/personal-use-only/image/upload', formData)
  return {url:data?.secure_url.toString()}
  }
