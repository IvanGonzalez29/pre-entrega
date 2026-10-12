// index.js
// URL de la API
const API_URL = 'https://fakestoreapi.com/products';
//npm start metodo products
const args = process.argv.slice(2);
console.log(args)

const method = args[0] ? args[0].toUpperCase() : '';
console.log(method)
// Separamos por si pasan "products/15" o "products/7" en el argumento
const rawResource = args[1] || '';
const [resource, subParam] = rawResource.split('/');
const param = subParam || args[2] || '';

async function handleRequest() {
  try {
    // 1. Consultar Todos los Productos: npm run start GET products
    if (method === 'GET' && resource === 'products' && !param) {
      const response = await fetch(API_URL);
      const products = await response.json();
      console.log("Lista completa de productos:", products);
    }
    
    // 2. Consultar un Producto Específico: npm run start GET products/15
    else if (method === 'GET' && resource === 'products' && param) {
      const response = await fetch(`${API_URL}/${param}`);
      const product = await response.json();
      console.log(`Producto con ID ${param}:`, product);
    }
    
    // 3. Crear un Producto Nuevo: npm run start POST products T-Shirt-Rex 300 remeras
    else if (method === 'POST' && resource === 'products') {
      const title = args[2];
      const price = args[3];
      const category = args[4];

      if (!title || !price || !category) {
        console.log("Error: Debes ingresar title, price y category.");
        return;
      }

      const newProduct = {
        title,
        price: parseFloat(price),
        category,
        description: 'Producto creado desde la pre-entrega',
        image: 'https://i.imgur.com/placeholder.png'
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
      });

      const result = await response.json();
      console.log("Resultado de creación (ID generado):", result);
    }
    
    // 4. Eliminar un Producto: npm run start DELETE products/7
    else if (method === 'DELETE' && resource === 'products' && param) {
      const response = await fetch(`${API_URL}/${param}`, {
        method: 'DELETE'
      });

      const result = await response.json();
      console.log(`El item con el id: ${param} se eliminó con éxito`, result);
    } 
    
    // Comando no reconocido
    else {
      console.log("Comando no reconocido. Utiliza formatos válidos como:");
      console.log("- npm run start GET products");
      console.log("- npm run start GET products/15");
      console.log("- npm run start POST products T-Shirt-Rex 300 remeras");
      console.log("- npm run start DELETE products/7");
    }

  } catch (error) {
    console.error("Ocurrió un error en la petición:", error.message);
  }
}
handleRequest();