import express, { json } from "express";

const app = express();
const routes = express.Router();


/* ruta de inserta productos */
routes.post('/productos', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO productos set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Producto añadido!')
        })
    })
})

/* ruta de isnercion de un prodcto en la tienda  */
routes.post('/tiendas_productos', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO tiendas_productos set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Producto añadido a la tienda!')
        })
    })
})

/* ruta de productos de tienda espesifica con promocion */
routes.get('/catalogo/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query("SELECT productos.id as Id_producto,tiendas.id as Id_tienda,productos.nombre ,productos.presentacion,productos.barcode,tiendas_productos.valor,promociones.estado,tiendas_promociones.inicio,tiendas_promociones.fin,promociones.porcentaje FROM tiendas INNER JOIN tiendas_productos ON tiendas.id = tiendas_productos.id_tienda INNER JOIN productos ON tiendas_productos.id_producto = productos.id INNER JOIN tiendas_promociones ON tiendas.id = tiendas_promociones.id_tienda INNER JOIN promociones ON tiendas_promociones.id_promocion = promociones.id WHERE tiendas.id = ?", [req.params.id], (err, rows)=>{
            if(err) return res.send(err)
            const fecha="2024-02-15";
            rows.forEach(row => {
                let valorDescuento=0
                const {estado,inicio,fin,valor,porcentaje}=row
                if(estado==1 && inicio<fecha>fin){
                    valorDescuento=valor*porcentaje/100
                    row.valorConDescuento=valorDescuento
                }
                
                });
            
            res.json(rows)
            
        })
    })
}) 

routes.post('/carritos', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('INSERT INTO carritos set ?', [req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.send('Producto añadido al carrito!')
        })
    })
})



















export default routes;