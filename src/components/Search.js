import React, { Component } from "react";
import { connect } from "react-redux";
import { dataSource, dataSourceTmp } from "../store/actions/index";
import { Button, Input } from "antd";

class Search extends Component {
  state = {
    keyword: ''
  };

  searchInput = event => {
    this.setState({ keyword: event.target.value });
  };

  _onSearch = () => {
    const data = this.props.dataSourceTmp.filter(item => {
      return item.name.toLowerCase().search(this.state.keyword.toLowerCase()) !== -1;
    });
    this.props.onDataSource(data);
    this.setState({ keyword: '' });
  };

  render() {
    return (
      <div>
        <p style={{ marginBottom: 5 }}>Search Supplier Name</p>
        <Input
          value={this.state.keyword}
          onChange={this.searchInput}
          style={{ marginBottom: "1rem" }}
        />
        <Button type="primary" icon="search" block onClick={this._onSearch}>
          Search
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    dataSource: state.main.dataSource,
    dataSourceTmp: state.main.dataSourceTmp
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onDataSource: item => dispatch(dataSource(item)),
    onDataSourceTmp: item => dispatch(dataSourceTmp(item))

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
