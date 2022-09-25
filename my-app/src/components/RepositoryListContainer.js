import RepositoyItem from './RepositoyItem'
import React, { useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import TextInput from './TextInput'
import { Picker } from '@react-native-picker/picker'
export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const [t, setT] = useState()
    const props = this.props
    const temp = (value) => {
      setT(t)
      props.setText(value)
    }
    return (
      <>
        <TextInput
          style={styles.input}
          value={props.text}
          placeholder="set filter"
          onChangeText={temp}
        />
        <ListFilter SetFilter={props.SetFilter} />
      </>
    )
  }
  render() {
    return (
      // <FlatList
      //   // ...
      //   ListHeaderComponent={this.renderHeader}
      // />
      <FlatList
        data={this.props.respositoryNodes}
        ListHeaderComponent={this.renderHeader}
        ItemSeparatorComponent={ItemSeparator}
        onEndReached={this.props.onEndReached}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => {
          return <RepositoyItem item={item} />
        }}
        // other props
      />
    )
  }
}

const styles = StyleSheet.create({
  input: {
    borderColor: '#aaa',
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
  },
  separator: {
    height: 10,
    backgroundColor: '#ccc',
  },
})
export const ListFilter = ({ SetFilter }) => {
  const [fl, setfl] = useState(0)
  const SetFl = (value) => {
    SetFilter(value)
    setfl(value)
  }
  return (
    <Picker selectedValue={fl} onValueChange={SetFl}>
      <Picker.Item label="Latest repositories" value={0} />
      <Picker.Item label="Highest rated repositories" value={1} />
      <Picker.Item label="Lowest rated repositories" value={2} />
    </Picker>
  )
}

export const ItemSeparator = () => <View style={styles.separator} />
