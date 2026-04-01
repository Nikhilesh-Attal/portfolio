import ImageKit from 'imagekit';
import dotenv from 'dotenv';

dotenv.config();

// 1. Check if the keys actually made it from the .env file
// console.log("--- ImageKit Env Check ---");
// console.log("URL Endpoint:", process.env.IMAGEKIT_URL_ENDPOINT);
// console.log("Public Key:", process.env.IMAGEKIT_PUBLIC_KEY ? "Loaded ✅" : "Missing ❌");
// console.log("Private Key:", process.env.IMAGEKIT_PRIVATE_KEY ? "Loaded ✅" : "Missing ❌");

let imageKit;

// 2. Wrap the actual initialization in the try/catch block
try {
    imageKit = new ImageKit({
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
    });
    console.log("ImageKit initialized successfully! 🚀");
} catch (error) {
    console.error("ImageKit initialization error: ", error);
}

export default imageKit;