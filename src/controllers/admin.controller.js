import { pool } from "../database.js";


export const renderAdminPanel = async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [users] = await connection.query("SELECT * FROM users WHERE role = 'user'");
        const [products] = await connection.query("SELECT * FROM products");
        res.render("admin/panel", { users, products });
    } catch (error) {
        console.error("Error al renderizar el panel de administrador:", error);
        res.status(500).json({ error: "Error al renderizar el panel de administrador", message: error.message });
    } finally {
        if (connection) connection.release(); // Asegúrate de liberar la conexión
    }
};



  export const addProduct = async (req, res) => {
    const { name, description, price } = req.body;
    let image = null;

    // Verificar si se envió un archivo de imagen
    if (req.file) {
        image = req.file.filename; // Nombre de archivo generado por multer
    }
    
    await pool.query("INSERT INTO products SET ?", {
        name,
        description,
        price,
        image,
    });
    try {
        await pool.query("INSERT INTO products SET ?", {
            name,
            description,
            price,
            image,
        });
        req.flash("success", "Producto agregado exitosamente");
        res.redirect("/admin/panel"); // Redirige al panel de administrador u otra página adecuada
    } catch (error) {
        console.error("Error al agregar producto:", error);
        req.flash("error", "Error al guardar el producto");
        res.redirect("/admin/panel"); // Maneja el error según sea necesario
    }
};
export const updateProduct = async (req, res) => {
    try {
        const { id, name, description, price } = req.body;
        const image = req.file ? req.file.filename : req.body.current_image;
        await pool.query("UPDATE products SET ? WHERE id = ?", [{ name, description, price, image }, id]);
        await pool.query("INSERT INTO audit_logs SET ?", { user_id: req.user.id, action: 'Updated a product' });
        await req.setFlash("success", "Product updated successfully");
    } catch (error) {
        await req.setFlash("error", "Failed to update product");
    }
    res.redirect("/admin/products");
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query("DELETE FROM products WHERE id = ?", [id]);
        await pool.query("INSERT INTO audit_logs SET ?", { user_id: req.user.id, action: 'Deleted a product' });
        await req.setFlash("success", "Product deleted successfully");
    } catch (error) {
        await req.setFlash("error", "Failed to delete product");
    }
    res.redirect("/admin/products");
};

export const viewUsers = async (req, res) => {
    try {
        const [users] = await pool.query("SELECT * FROM users WHERE role = 'user'");
        res.render("admin/users", { users });
    } catch (error) {
        await req.setFlash("error", "Failed to retrieve users");
        res.redirect("/admin/panel");
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query("DELETE FROM users WHERE id = ?", [id]);
        await req.setFlash("success", "User deleted successfully");
    } catch (error) {
        await req.setFlash("error", "Failed to delete user");
    }
    res.redirect("/admin/users");
};

export const viewAuditLogs = async (req, res) => {
    try {
        const [logs] = await pool.query("SELECT * FROM audit_logs");
        res.render("admin/logs", { logs });
    } catch (error) {
        await req.setFlash("error", "Failed to retrieve audit logs");
        res.redirect("/admin");
    }
};

export const getProducts = async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const [products] = await connection.query('SELECT * FROM products');
        res.render('admin/products', { products });
    } catch (error) {
        console.error('Error al obtener los productos:', error.message);
        res.status(500).json({ error: 'Error al obtener los productos', message: error.message });
    } finally {
        if (connection) connection.release(); // Asegúrate de liberar la conexión
    }
};

