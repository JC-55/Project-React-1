function ProductRow(props) {
  const product = props.product;
  const name = product.stocked ? 
    product.name :
    <span style={{color: 'red'}}>
      {product.name}
    </span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}

function ProductCategoryRow(props) {
  const category = props.category;
  return (
    <tr>
      <th colSpan="2">
        {category}
      </th>
    </tr>
  );
}

function ProductTable(props) {
  const filterText = props.filterText;
  const inStockOnly = props.inStockOnly;
  
  const rows = [];
  let lastCategory = null;

  props.products.forEach((product) => {
    if (product.name.indexOf(filterText) === -1) {
      return;
    }
    if (inStockOnly && !product.stocked) {
      return;
    }
    if (product.category !== lastCategory) {
      rows.push(
        <ProductCategoryRow
          category={product.category}
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );
    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar(props) {
  const filterText = props.filterText;
  const inStockOnly = props.inStockOnly;
  
  return (
    <form>
      <input 
        type="text" 
        placeholder="Search..." 
        value={filterText}
        onChange={e => props.onFilterTextChange(e.target.value)} 
      />
      <p>
        <input 
          type="checkbox" 
          checked={inStockOnly} 
          onChange={e => props.onInStockChange(e.target.checked)}
        />
        {' '}
        Only show products in stock
      </p>
    </form>
  );
}

function FilterableProductTable(props) {
  const [filterText, setFilterText] = React.useState(""); 
  const [inStockOnly, setInStockOnly] = React.useState(false);
  
  return (
    <div>
      <SearchBar 
        filterText={filterText}
        inStockOnly={inStockOnly}  
        onFilterTextChange={text => setFilterText(text)}
        onInStockChange={stock => setInStockOnly(stock)}
      />
      <ProductTable 
        products={props.products} 
        filterText={filterText}
        inStockOnly={inStockOnly} 
      />
    </div>
  );
}

const PRODUCTS = [
  {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
  {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
  {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
  {category: 'Electronics', price: '$899.99', stocked: true, name: 'iPad'},
  {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 11'},
  {category: 'Electronics', price: '$199.99', stocked: true, name: 'Galaxy S20'}
];

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById('root')
);
