var ProductCategoryRow = React.createClass({
  render: function() {
    return (
      <tr><th colSpan="2">{this.props.category}</th></tr>
    );
  }
});

var ProductRow = React.createClass({
  render: function() {
    var name = this.props.product.stocked ?
      this.props.product.name :
      <span style={{color: '#32B1FC'}}>
        {this.props.product.name}
      </span>;
    return (
      <tr>
        <td>{name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    );
  }
});

var ProductTable = React.createClass({
  render: function() {
    var rows = [];
    var lastCategory = null;
    this.props.products.forEach(function(product) {
      if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
      }
      rows.push(<ProductRow product={product} key={product.name} />);
      lastCategory = product.category;
    }.bind(this));
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
});

var SearchBar = React.createClass({
  handleChange: function() {
    this.props.onUserInput(
      this.refs.filterTextInput.value,
      this.refs.inStockOnlyInput.checked
    );
  },
  render: function() {
    return (
      <form>
        <h1>Filter Products</h1>
        <input
          type="text"
          placeholder="Search..."
          value={this.props.filterText}
          ref="filterTextInput"
          onChange={this.handleChange} />
        <p>
          <input
            type="checkbox"
            checked={this.props.inStockOnly}
            ref="inStockOnlyInput"
            onChange={this.handleChange} />
          Only show products in stock
        </p>
      </form>
    );
  }
});

var FilterProductTable = React.createClass({
  getInitialState: function() {
    return {
      filterText: '',
      inStockOnly: false
    };
  },
  handleUserInput: function(filterText, inStockOnly) {
    this.setState({
      filterText: filterText,
      inStockOnly: inStockOnly
    });
  },
  render: function() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onUserInput={this.handleUserInput} />
        <h1 id="table-title">Product List</h1>
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly} />
      </div>
    );
  }
});

var PRODUCTS = [
  {category: 'Bedroom', price: '$49.99', stocked: true, name: 'Sheet Set'},
  {category: 'Bedroom', price: '$19.99', stocked: true, name: 'Throw Blanket'},
  {category: 'Bedroom', price: '$29.99', stocked: false, name: 'Pillow'},
  {category: 'Kitchen', price: '$99.99', stocked: true, name: 'Blender'},
  {category: 'Kitchen', price: '$399.99', stocked: false, name: 'KitchenAid Mixer'},
  {category: 'Kitchen', price: '$199.99', stocked: true, name: 'Espresso Machine'},
  {category: 'Bathroom', price: '$99.99', stocked: true, name: 'Mirror'},
  {category: 'Bathroom', price: '$39.99', stocked: false, name: 'Shower Curtain'},
  {category: 'Bathroom', price: '$9.99', stocked: true, name: 'Toilet Brush'}
];

ReactDOM.render(
  <FilterProductTable products={PRODUCTS} />, document.getElementById('container'));

