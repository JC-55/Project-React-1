function ProductRow(props) {
  const product = props.product;
  const name = product.stocked ? 
    product.name :
    <span className="text-red-600">
      {product.name}
    </span>;

  return (
    <tr className="border-b border-gray-700">
      <td className="p-1">{name}</td>
      <td className="p-1 text-right">{product.price}</td>
    </tr>
  );
}

function ProductCategoryRow(props) {
  const category = props.category;
  return (
    <tr>
      <th colSpan="2" className="text-orange-600 bg-gray-800 border-b border-gray-700 py-2">
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
        key={product.name}
      />
    );
    lastCategory = product.category;
  });

  return (
    <table className="table-fixed lg:w-1/3 md:w-1/3 sm:w-1/2 my-5">
      <thead>
        <tr className="border-b border-t border-gray-700">
          <th className="w-1/2 px-4 py-2 text-left">Name</th>
          <th className="w-1/2 px-4 py-2 text-right">Price</th>
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
        className="shadow appearance-none border-none rounded w-full py-2 px-3 mb-4 bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      <p>
        <input 
          type="checkbox" 
          checked={inStockOnly} 
          onChange={e => props.onInStockChange(e.target.checked)}
          className="mr-2 leading-tight"
        />
        <span class="text-sm">
          Only show products in stock
        </span>
      </p>
    </form>
  );
}

function FilterableProductTable(props) {
  const [filterText, setFilterText] = React.useState(""); 
  const [inStockOnly, setInStockOnly] = React.useState(false);
  
  return (
    <div className="flex flex-col pt-10 items-center min-h-screen w-full bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-5">Products</h1>
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
