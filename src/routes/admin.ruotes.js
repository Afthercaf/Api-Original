import { Router } from "express";
import { isAdmin } from "../middlewares/role.middleware.js";
import { renderAdminPanel, addProduct, deleteProduct, updateProduct, deleteUser, getProducts } from "../controllers/admin.controller.js";
import multer from "multer";
import path from 'path';
import fs from 'fs';

const router = Router();

// Multer disk storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'C:/Users/Afthercaft/Desktop/nodejs-mysql-links-master/src/public/img'; // Adjusted path
        // Check if the directory exists, create it if not
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Admin routes
router.get("/panel", isAdmin, renderAdminPanel);
router.post("/add-product", isAdmin, upload.single('image'), addProduct);
router.get("/delete-product/:id", isAdmin, deleteProduct);
router.post("/update-product/:id", isAdmin, upload.single('image'), updateProduct);
router.get("/delete-user/:id", isAdmin, deleteUser);
router.get('/products', isAdmin, getProducts); // Ruta para obtener productos

export default router;
