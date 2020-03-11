
import "./shim.js";
import crypto from "crypto";
import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from "react-native";
import ipfsClient from "ipfs-http-client";


//const OrbitDB = require('orbit-db')
import Identities from 'orbit-db-identity-provider';
import EthIdentityProvider from 'orbit-db-identity-provider/src/ethereum-identity-provider';


const type = EthIdentityProvider.type
Identities.addIdentityProvider(EthIdentityProvider);


const ipfs = ipfsClient({
  host: "127.0.0.1",
  port: "5002",

});

class App extends Component {



  constructor(props) {
    super(props);
    this.state = {
      hash: {},
      version: {},
      stats: {},
      identity: {},
    };
  }

  async componentWillMount() {
    await this.dagPut();

  }

  dagPut = async () => {

    const hash = await ipfs.id();
    console.log("HASH", hash);
    this.setState({ hash })

    const version = await ipfs.version();
    console.log('version', version);
    this.setState({ version })

    const stats = await ipfs.stats.bitswap();
    console.log('stats', stats);
    this.setState({ stats })


    const identity = await Identities.createIdentity({ type: type })
    console.log(identity, 'identity')
    this.setState({ identity })


    /* Todo: PUT requests are failing to IPFS need to investigate*/
    try {
      const buf = new Buffer('a serialized object')

      const block = await ipfs.block.put(buf)
      console.log(block.data.toString())
      console.log(block.cid.toString())
    } catch (error) {
      console.log(error)
    }

  };
  render() {
    const { hash, version, stats, identity } = this.state;
    return (
      <ScrollView style={styles.container}>
        <View>
          {Object.keys(hash).map(key => <View style={{ marginVertical: 10 }} key={key}><View><Text>{key}</Text></View><View><Text>{JSON.stringify(hash[key])}</Text></View></View>)}
        </View>
        <View>
          {Object.keys(version).map(key => <View style={{ marginVertical: 10 }} key={key}><View><Text>{key}</Text></View><View><Text>{JSON.stringify(version[key])}</Text></View></View>)}
        </View>
        <View>
          {Object.keys(stats).map(key => <View style={{ marginVertical: 10 }} key={key}><View><Text>{key}</Text></View><View><Text>{JSON.stringify(stats[key])}</Text></View></View>)}
        </View>
        <View>
          {Object.keys(identity).map(key => <View style={{ marginVertical: 10 }} key={key}><View><Text>{key}</Text></View><View><Text>{JSON.stringify(identity[key])}</Text></View></View>)}
        </View>
      </ScrollView>);
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  }
});


export default App;






