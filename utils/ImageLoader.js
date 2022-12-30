const ImageLoader = ({ src, width, quality }) => `${process.env.NEXT_PUBLIC_MEDIA_DOMAIN}/load.php?dir=${src}&width=${width}&height=${width}&quality=${quality || 75}`

export default ImageLoader