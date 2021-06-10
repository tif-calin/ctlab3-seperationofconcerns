import { query } from 'pool';

// 1. define the shape of our data
// 2. define methods to access that data (CRUD)
class Order {
  id;
  quantityOfItems;

  constructor(row) {
    this.id = row.id;
    this.quantityOfItems = row.quantity_of_items;
  }

  // static method
  // instance method
  static async insert(quantityOfItems) {
    const { rows } = await query(`
        INSERT INTO orders (quantity_of_items) 
        VALUES ($1) 
        RETURNING *;
      `, [quantityOfItems]
    );

    return new Order(rows[0]);
  }

  static async read(id) {
    const data = await query(`
        SELECT id, quantity_of_items as "quantityOfItems"
        FROM orders
        WHERE id = $1;
      `, [id]
    );

    return new Order(data.rows[0]);
  }

  static async update(id, quantityOfItems) {
    const data = await query(`
        UPDATE orders
        SET quantity_of_items = $1
        WHERE id = $2
        RETURNING id, quantity_of_items as "quantityOfItems";
      `, [quantityOfItems, id]
    );

    return new Order(data.rows[0]);
  }

  static async remove(id) {
    const data = await query(`
        DELETE FROM orders
        WHERE id = $1
        RETURNING id, quantity_of_items as "quantityOfItems";
      `, [id]
    );

    return new Order(data.rows[0]);
  }
}

export default Order;
