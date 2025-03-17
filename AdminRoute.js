import express from 'express'
import bodyParser from'body-parser';
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import multer from "multer";
import path from "path";
import download from "download"


const router = express.Router()

router.post('/adminlogin', (req, res) =>{ 
    //console.log(req.body)
    const sql = "SELECT * from registers Where email = ? and password = ?";
    con.query(sql, [req.body.email, req.body.password],
        (err, result)=>{
            if(err) return res.json({loginStatus: false, Error: "Query error"})
            if(result.length>0){
                const email = result[0].email;
                const token = jwt.sign({ role: "admin", email: email }, "jwt_secret_key", { expiresIn: "100d" });
                res.cookie('token', token)
                return res.json({ loginStatus: true });
            }
            else{
                return res.json({ loginStatus: false, Error: "Wrong email or password" });
            }
        }
    )
})


router.post('/add_vendor', (req, res) => {
    const sql = `INSERT INTO vendor_register 
    (name,email,password, vendorcode, active) 
    VALUES (?)`;
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.vendorcode,
            req.body.active,
        ]
        con.query(sql, [values], (err, result) => {
            if(err) return res.json({Status: false, Error: err})
            return res.json({Status: true})
        })
    })
})

router.get('/vendorname', (req, res) => {
  const sql = "SELECT * FROM vendor_register";
  con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
  })
})

// image upload 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === "image") {
            cb(null, 'Public/Images')
        }

        else if (file.fieldname === "techpack") {
            cb(null, 'Public/Teckpacks')
        }
      //cb(null, 'Public/Images');
    },
    filename: function (req, file, cb) {
        if (file.fieldname === "image") {
            cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
        }
      else if (file.fieldname === "techpack") {
        cb(null, file.fieldname+Date.now()+path.extname(file.originalname));
      }

      //cb(null, file.fieldname + '-' + Date.now());
    }
  });
const upload = multer({
    storage: storage
})
// end imag eupload 

const multipleload = upload.fields ([{name: 'image'},{ name: "techpack"}])

router.post('/add_style',multipleload, (req, res)=>{
    //console.log(req.body);

    const sql = `INSERT INTO addstyles 
    (prod_code,prod_name,skin, kase, totalct, frame, print_logo,
    embroidery, image, techpack, category, postdate, remark,active)
    VALUES (?)`;
        const values = [
            req.body.prod_code,
            req.body.prod_name,
            req.body.skin,
            req.body.kase,
            req.body.totalct,
            req.body.frame,
            req.body.print_logo,
            req.body.embroidery,
            req.files['image'][0].filename,
            req.files['techpack'][0].filename,
            req.body.category,
            req.body.postdate,
            req.body.remark,
            req.body.active, 
        ]
        con.query(sql, [values], (err, result) => {
            if(err) return res.json({Status: false, Error: console.log(err)})
            return res.json({Status: true})
        })
})

router.get('/search', (req, res) => {
    const query = req.query.q;
    const sql = 'SELECT * FROM addstyles WHERE prod_name LIKE ?';
    con.query(sql, [`%${query}%`], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

router.get('/products', (req, res) => {
    const sql = 'SELECT * FROM addstyles';
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});


router.get('/style/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM addstyles WHERE id = ?";
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.put('/edit_style/:id', multipleload, (req, res) => {
    const id = req.params.id;
    // Fetch current product details
  const fetchSql = `SELECT * FROM addstyles WHERE id = ?`;
  con.query(fetchSql, [id], (fetchErr, fetchResult) => {
    if (fetchErr) {
      console.error('Fetch Query Error:', fetchErr);
      return res.json({ Status: false, Error: "Fetch Query Error: " + fetchErr });
    }

    if (fetchResult.length === 0) {
      return res.json({ Status: false, Error: "Product not found" });
    }

    const currentProduct = fetchResult[0];

    // Prepare updated values
    const updatedValues = {
      prod_code: req.body.prod_code || currentProduct.prod_code,
      prod_name: req.body.prod_name || currentProduct.prod_name,
      skin: req.body.skin || currentProduct.skin,
      kase: req.body.kase || currentProduct.kase,
      totalct: req.body.totalct || currentProduct.totalct,
      frame: req.body.frame || currentProduct.frame,
      print_logo: req.body.print_logo || currentProduct.print_logo,
      embroidery: req.body.embroidery || currentProduct.embroidery,
      image: req.files['image'] ? req.files['image'][0].filename : currentProduct.image,
      techpack: req.files['techpack'] ? req.files['techpack'][0].filename : currentProduct.techpack,
      category: req.body.category || currentProduct.category,
      postdate: req.body.postdate ? new Date(req.body.postdate) : currentProduct.postdate,
      remark: req.body.remark || currentProduct.remark,
      active: req.body.active || currentProduct.active,
    };

    const updateSql = `UPDATE addstyles 
      SET prod_code = ?, prod_name = ?, skin = ?, kase = ?, totalct = ?, frame = ?,
      print_logo = ?, embroidery = ?, image = ?, techpack = ?, category = ?, postdate = ?, remark = ?, active = ? 
      WHERE id = ?`;

    const values = [
      updatedValues.prod_code,
      updatedValues.prod_name,
      updatedValues.skin,
      updatedValues.kase,
      updatedValues.totalct,
      updatedValues.frame,
      updatedValues.print_logo,
      updatedValues.embroidery,
      updatedValues.image,
      updatedValues.techpack,
      updatedValues.category,
      updatedValues.postdate,
      updatedValues.remark,
      updatedValues.active,
      id,
    ];

    con.query(updateSql, values, (updateErr, updateResult) => {
      if (updateErr) {
        console.error('Update Query Error:', updateErr);
        return res.json({ Status: false, Error: "Update Query Error: " + updateErr });
      }
      return res.json({ Status: true, Result: updateResult });
    });
  });
  
});

router.delete('/delete_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM addstyles WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) {
            return res.json({ Status: false, Error: "Query Error: " + err });
        }
        if (result.affectedRows > 0) {
            return res.json({ Status: true });
        } else {
            return res.json({ Status: false, Error: "Employee not found" });
        }
    });
});


router.post('/add_color', (req, res) => {
    //const sql = "INSERT INTO gmtype (`name`) VALUES (?)"
    const sql = `INSERT INTO color (color_name, pantone) VALUES (?)`
    const values = [
      req.body.color_name,
      req.body.pantone,
    ]
    con.query(sql, [values], (err, result) => {
    if(err) return res.json({Status: false, Error: err})
    return res.json({Status: true})
  })
})


router.get('/colorlist', (req, res) => {
    const sql = "SELECT * FROM color";
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    })
})

router.post('/prodncolor', (req, res) => {
  const { selectedProductId, selectedColorId, productSAP } = req.body;

  // Check if productSAP already exists
  const checkSql = 'SELECT * FROM prodncolor WHERE SAP_id = ?';
  con.query(checkSql, [productSAP], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.status(400).send('This Product color Already exist!');
    } else {
      const sql = 'INSERT INTO prodncolor (prod_id, color_id, SAP_id) VALUES (?, ?, ?)';
      con.query(sql, [selectedProductId, selectedColorId, productSAP], (err, result) => {
        if (err) throw err;
        res.send('Product details saved!');
      });
    }
  });
});


//router.get('/viewprodcolor', (req, res) => {
    //const sql = 'SELECT pd.id, a.prod_name, c.color_name, pd.SAP_id FROM prodncolor pd JOIN addstyles a ON pd.prod_id = a.id JOIN color c ON pd.color_id = c.id';

    //con.query(sql, (err, results) => {
      //if (err) throw err;
      //res.json(results);
    //});
//});

router.get('/viewprodcolor', (req, res) => {
  const sql = `
      SELECT pd.id, a.prod_name, c.color_name, pd.SAP_id, a.skin, a.kase, a.totalct 
      FROM prodncolor pd 
      JOIN addstyles a ON pd.prod_id = a.id 
      JOIN color c ON pd.color_id = c.id
  `;

  con.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
  });
});


router.get('/sapinfo', (req, res) => {
  const { sap } = req.query; // SAP query parameter
  let sql = `
      SELECT pd.id, a.prod_name, c.color_name, pd.SAP_id, a.skin, a.kase, a.totalct 
      FROM prodncolor pd 
      JOIN addstyles a ON pd.prod_id = a.id 
      JOIN color c ON pd.color_id = c.id
  `;

  if (sap) {
      sql += ` WHERE pd.SAP_id = '${sap}'`;
  }

  con.query(sql, (err, results) => {
      if (err) throw err;
      res.json(results);
  });
});


router.delete('/deleteprodcolor/:id', (req, res) => {
  const { id } = req.params;
  const deleteQuery = 'DELETE FROM prodncolor WHERE id = ?';

  con.query(deleteQuery, [id], (err, result) => {
    if (err) {
      console.error('Error deleting product color:', err);
      res.status(500).send('Failed to delete product color');
    } else {
      res.send('Product color deleted successfully');
    }
  });
});


router.post('/add_destiny', (req, res) => {
  //const sql = "INSERT INTO gmtype (`name`) VALUES (?)"
  const sql = `INSERT INTO destination (dest, remark) VALUES (?)`
  const values = [
    req.body.dest,
    req.body.remark,
  ]
  con.query(sql, [values], (err, result) => {
  if(err) return res.json({Status: false, Error: err})
  return res.json({Status: true})
})
})

router.get('/destiny', (req, res) => {
  const sql = "SELECT * FROM destination";
  con.query(sql, (err, result) => {
      if (err) throw err;
      res.send(result);
  })
})

// Endpoint to save multiple records
router.post('/vendorpo', (req, res) => {
  const records = req.body.records; // Array of records
  const commonValues = req.body.commonValues; // Common values

  // Prepare the values array
  const values = records.map(record => [
    commonValues.vendorpo,
    commonValues.poRemark,
    commonValues.factory,
    commonValues.poDate,
    commonValues.orderType,
    commonValues.orderCycle,
    commonValues.season,
    record.sap,
    record.product,
    record.color,
    record.qty,
    record.delivery,
    record.destination,
    record.customerpo,
    record.remark
  ]);

  let sql = 'INSERT INTO vendorpo (vendorpo, poRemark, factory, poDate, orderType, orderCycle, season, sap, product, color, qty, delivery, destination, customerpo, remark) VALUES ?';
  con.query(sql, [values], (err, result) => {
    if (err) {
      throw err;
    }
    res.send(`Number of records inserted: ${result.affectedRows}`);
  });
});


router.get('/posearch', (req, res) => {
  const searchQuery = req.query.q;
  const sql = `SELECT * FROM vendorpo 
               WHERE vendorpo LIKE ? OR poRemark LIKE ? OR factory LIKE ? OR orderType LIKE ? OR orderCycle LIKE ? OR season LIKE ? OR sap LIKE ? OR product LIKE ? OR delivery LIKE ? OR destination LIKE ? OR customerpo LIKE ?
               ORDER BY delivery`; // Add ORDER BY clause to sort by delivery date
  const values = Array(11).fill(`%${searchQuery}%`);

  con.query(sql, values, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});



router.delete('/delete_po/:id', (req, res) => {
  const poId = req.params.id;
  const sql = `DELETE FROM vendorpo WHERE id = ${poId}`;

  con.query(sql, (err, result) => {
    if (err) {
      console.error('Error deleting PO:', err);
      res.status(500).json({ error: 'Failed to delete PO' });
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'PO not found' });
      return;
    }
    res.json({ message: 'PO deleted successfully' });
  });
});

router.put('/updatepo/:id', (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const sql = 'UPDATE vendorpo SET ? WHERE id = ?'; // Replace with your table name
  con.query(sql, [updatedData, id], (err, results) => {
    if (err) throw err;
    res.json({ message: 'PO updated successfully' });
  });
});

router.put('/saveAllPlans', (req, res) => {
  const dataToSave = req.body; // Array of { poId, data } objects

  // Use a transaction to ensure all updates are atomic
  con.beginTransaction(err => {
    if (err) {
      return res.status(500).send({ error: 'Error starting transaction' });
    }

    const queries = dataToSave.map(({ poId, data }) => {
      return new Promise((resolve, reject) => {
        const sql = `
          UPDATE vendorpo
          SET
            planmark = ?,
            mat_eta = ?,
            mat_done = ?,
            ppm = ?,
            ppmdone = ?,
            cut = ?,
            cutdone = ?,
            print_emb = ?,
            print_embdone = ?,
            skinloc = ?,
            skinline = ?,
            skinsewer = ?,
            skinworkhrs = ?,
            skinput = ?,
            skinouput = ?,
            kaseloc = ?,
            kaseline = ?,
            kasesewers = ?,
            kaseworkhrs = ?,
            kaseinput = ?,
            kaseouput = ?
          WHERE id = ?
        `;

        const values = [
          data.planmark || null,
          data.mat_eta || null,
          data.mat_done || null,
          data.ppm || null,
          data.ppmdone || null,
          data.cut || null,
          data.cutdone || null,
          data.print_emb || null,
          data.print_embdone || null,
          data.skinloc || null,
          data.skinline || null,
          data.skinsewer || null,
          data.skinworkhrs || null,
          data.skinput || null,
          data.skinouput || null,
          data.kaseloc || null,
          data.kaseline || null,
          data.kasesewers || null,
          data.kaseworkhrs || null,
          data.kaseinput || null,
          data.kaseouput || null,
          poId
        ];

        con.query(sql, values, (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve(result);
        });
      });
    });

    // Execute all queries
    Promise.all(queries)
      .then(() => {
        con.commit(err => {
          if (err) {
            return con.rollback(() => {
              res.status(500).send({ error: 'Error committing transaction' });
            });
          }
          res.send({ message: 'All changes saved successfully!' });
        });
      })
      .catch(err => {
        con.rollback(() => {
          res.status(500).send({ error: 'Error saving data', details: err });
        });
      });
  });
});



// Add this endpoint to your existing backend
router.get('/api/search-orders', (req, res) => {
  const { searchQuery } = req.query;

  const query = `
    SELECT * FROM vendorpo
    WHERE 
      sap LIKE ? OR
      orderCycle LIKE ? OR
      product LIKE ? OR
      color LIKE ? OR
      destination LIKE ?
      ORDER BY delivery
  `;

  //const query = `SELECT * FROM vendorpo 
               //WHERE vendorpo LIKE ? OR poRemark LIKE ? OR factory LIKE ? OR orderType LIKE ? OR orderCycle LIKE ? OR season LIKE ? OR sap LIKE ? OR product LIKE ? OR delivery LIKE ? OR destination LIKE ? OR customerpo LIKE ?
               //ORDER BY delivery`; // Add ORDER BY clause to sort by delivery date

  const searchPattern = `%${searchQuery}%`;

  con.query(query, [searchPattern, searchPattern, searchPattern, searchPattern, searchPattern], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
});


// Bulk update records endpoint
router.put('/api/bulk-update-records', (req, res) => {
  const orders = req.body.orders; // Array of orders to update

  if (!Array.isArray(orders)) {
    return res.status(400).json({ error: 'Expected an array of orders' });
  }

  const query = `
    UPDATE vendorpo
    SET 
      planmark = ?, mat_eta = ?, mat_done = ?, ppm = ?, ppmdone = ?, cut = ?, cutdone = ?, print_emb = ?
      , print_embdone = ?, skinloc = ?, skinline = ?, skinsewer = ?, skinworkhrs = ?, skinput = ?, skinouput = ?, kaseloc = ?
      , kaseline = ?, kasesewers = ?, kaseworkhrs = ?, kaseinput = ?, kaseouput = ?
    WHERE id = ?
  `;

  // Use a transaction to ensure all updates succeed or fail together
  con.beginTransaction((err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    const promises = orders.map((order) => {
      return new Promise((resolve, reject) => {
        //const {
          //vendorpo, poRemark, factory, poDate, orderType, orderCycle, season, sap, product, color, qty, delivery,
          //destination, customerpo, remark, planmark, mat_eta, mat_done, ppm, ppmdone, cut, cutdone, print_emb,
          //print_embdone, skinloc, skinline, skinsewer, skinworkhrs, skininput, skinoutput, kaseloc, kaseline,
          //kasesewers, kaseworkhrs, kaseinput, kaseoutput, id
        //} = order;
        const { planmark, mat_eta, mat_done, ppm, ppmdone, cut, cutdone, print_emb,
          print_embdone, skinloc, skinline, skinsewer, skinworkhrs, skinput, skinouput, kaseloc, kaseline,
          kasesewers, kaseworkhrs, kaseinput, kaseouput, id } = order;

        //con.query(query, [
          //vendorpo, poRemark, factory, poDate, orderType, orderCycle, season, sap, product, color, qty, delivery,
          //destination, customerpo, remark, planmark, mat_eta, mat_done, ppm, ppmdone, cut, cutdone, print_emb,
          //print_embdone, skinloc, skinline, skinsewer, skinworkhrs, skininput, skinoutput, kaseloc, kaseline,
          //kasesewers, kaseworkhrs, kaseinput, kaseoutput, id
        //]
        con.query(query, [planmark, mat_eta, mat_done, ppm, ppmdone, cut, cutdone, print_emb,
          print_embdone, skinloc, skinline, skinsewer, skinworkhrs, skinput, skinouput, kaseloc, kaseline,
          kasesewers, kaseworkhrs, kaseinput, kaseouput, id]        
        , (err, result) => {
          if (err) {
            return reject(err);
          }
          resolve(result);
        });
      });
    });

    Promise.all(promises)
      .then(() => {
        con.commit((err) => {
          if (err) {
            return db.rollback(() => {
              res.status(500).json({ error: err.message });
            });
          }
          res.status(200).json({ message: 'All records updated successfully' });
        });
      })
      .catch((err) => {
        con.rollback(() => {
          res.status(500).json({ error: err.message });
        });
      });
  });
});

// New route to save daily capacity data
router.post('/savedailycap', (req, res) => {
  const { prodate, lines } = req.body;

  // Validate input
  if (!prodate || !Array.isArray(lines) || lines.length === 0) {
      return res.status(400).json({ success: false, error: "Invalid input data" });
  }

  // Prepare the SQL query
  const sql = `INSERT INTO dailycapacity (prodate, vendor, location, line, sewers, workhrs) VALUES ?`;
  const values = lines.map(line => [
      prodate,
      line.vendor,
      line.location,
      line.line,
      line.sewers,
      line.workhrs
  ]);

  // Execute the query
  con.query(sql, [values], (err, result) => {
      if (err) {
          console.error('Error saving data to MySQL:', err);
          return res.status(500).json({ success: false, error: "Database error" });
      }
      res.json({ success: true });
  });
});

router.post('/savedailyoutput', (req, res) => {
  const records = req.body; // Array of records from the frontend

  // Validate input
  if (!Array.isArray(records) || records.length === 0) {
      return res.status(400).json({ success: false, error: "Invalid input data" });
  }

  // Prepare the SQL query
  const sql = `
      INSERT INTO dailyoutput 
      (prodate, location, line, factory, orderid, sap, product, color, skin, kase, skinqty, caseqty, packqty) 
      VALUES ?
  `;

  // Prepare the values array
  const values = records.map(record => [
      record.prodate,
      record.location,
      record.line,
      record.factory,
      record.orderid,
      record.sap,
      record.product,
      record.color,
      record.skin, // Include skin value
      record.kase, // Include kase value
      record.skinqty,
      record.caseqty,
      record.packqty
  ]);

  // Execute the query
  con.query(sql, [values], (err, result) => {
      if (err) {
          console.error('Error saving data to MySQL:', err);
          return res.status(500).json({ success: false, error: "Database error" });
      }
      res.json({ success: true, message: "Data saved successfully" });
  });
});


export{ router as adminRouter}
