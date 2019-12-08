import React, { Component } from "react";
import { Layout } from "antd";
import EditableTable from "./components/EditableTable";
import AddData from "./components/AddData";
import Search from "./components/Search";
import "./App.css";

const { Content, Sider } = Layout;

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Content style={{ padding: "0 50px" }}>
            <Layout style={{ padding: "24px 0" }}>
              <Sider
                width={200}
                style={{
                  background: "#fff",
                  borderRight: "1px solid #1890FF",
                  padding: "1rem"
                }}
              >
                <Search />
              </Sider>
              <Content style={{ padding: "0 24px", minHeight: 280 }}>
                <AddData />
                <EditableTable />
              </Content>
            </Layout>
          </Content>
        </Layout>
      </div>
    );
  }
}

export default App;
